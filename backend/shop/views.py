from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product, Review, Cart, Order
from .serializers import (
    CategorySerializer, ProductSerializer, ReviewSerializer,
    CartSerializer, OrderSerializer, RegisterSerializer
)
from rest_framework import generics
from django.contrib.auth import get_user_model

# JWT imports
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

User = get_user_model()


# ------------------ ViewSets ------------------

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ["name", "description"]
    ordering_fields = ["price", "name", "id"]
    filterset_fields = ["category"]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        product = serializer.validated_data["product"]
        quantity = serializer.validated_data.get("quantity", 1)

        # Check if this product already exists in user's cart
        cart_item, created = Cart.objects.get_or_create(
            user=self.request.user, product=product,
            defaults={"quantity": quantity}
        )

        if not created:
            # If already in cart, just increase quantity
            cart_item.quantity += quantity
            cart_item.save()



class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


# ------------------ Auth Views ------------------

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer



# views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
