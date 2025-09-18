from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Category, Product, Review, Cart, Order, OrderItem

User = get_user_model()

class AuthTests(APITestCase):

    def test_user_registration(self):
        url = reverse("register")
        data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "TestPass123",
            "confirm_password": "TestPass123"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

    def test_user_login_jwt(self):
        user = User.objects.create_user(username="testuser", email="test@example.com", password="TestPass123")
        url = reverse("login")
        data = {
            "email": "test@example.com",
            "password": "TestPass123"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)


class CategoryProductTests(APITestCase):

    def setUp(self):
        self.category = Category.objects.create(name="Electronics")
        self.product1 = Product.objects.create(
            category=self.category, name="Laptop", description="Gaming laptop", price=1500, stock=5
        )
        self.product2 = Product.objects.create(
            category=self.category, name="Mouse", description="Wireless mouse", price=50, stock=20
        )

    def test_category_list(self):
        url = reverse("category-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_product_list_filter_ordering(self):
        url = reverse("product-list")
        # Test filtering by category
        response = self.client.get(url, {"category": self.category.id})
        self.assertEqual(len(response.data), 2)
        # Test search
        response = self.client.get(url, {"search": "Laptop"})
        self.assertEqual(len(response.data), 1)
        # Test ordering
        response = self.client.get(url, {"ordering": "-price"})
        self.assertEqual(response.data[0]["name"], "Laptop")


class ReviewCartOrderTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="testuser", email="test@example.com", password="TestPass123")
        self.client.force_authenticate(user=self.user)

        self.category = Category.objects.create(name="Electronics")
        self.product = Product.objects.create(
            category=self.category, name="Laptop", description="Gaming laptop", price=1500, stock=5
        )

    def test_create_review(self):
        url = reverse("review-list")
        data = {"product": self.product.id, "rating": 5, "comment": "Excellent"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Review.objects.count(), 1)

    def test_cart_crud(self):
        url = reverse("cart-list")
        # Add to cart
        data = {"product_id": self.product.id, "quantity": 2}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cart.objects.count(), 1)
        # Update quantity
        cart_id = response.data["id"]
        response = self.client.patch(reverse("cart-detail", args=[cart_id]), {"quantity": 3})
        self.assertEqual(response.data["quantity"], 3)
        # Delete cart item
        response = self.client.delete(reverse("cart-detail", args=[cart_id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_order_creation(self):
        # Add to cart first
        cart = Cart.objects.create(user=self.user, product=self.product, quantity=2)
        url = reverse("order-list")
        data = {"products": [self.product.id]}
        response = self.client.post(url, data)
        # Assuming your OrderViewSet calculates total_price in perform_create
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 1)
        order = Order.objects.first()
        self.assertEqual(order.user, self.user)
