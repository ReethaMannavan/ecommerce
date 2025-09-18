from django.contrib import admin
from django.utils.html import format_html
from .models import User, Category, Product, Review, Cart, Order, OrderItem

# ----------------- User -----------------
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "username", "email", "phone", "is_staff", "is_active"]
    search_fields = ["username", "email", "phone"]
    list_filter = ["is_staff", "is_active"]


# ----------------- Category -----------------
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


# ----------------- Product -----------------
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "category", "price", "stock", "image_tag"]
    search_fields = ["name", "description"]
    list_filter = ["category"]

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" />', obj.image.url)
        return "-"
    image_tag.short_description = "Image"


# ----------------- Review -----------------
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "user", "rating", "comment", "created_at"]
    search_fields = ["product__name", "user__username", "comment"]
    list_filter = ["rating", "created_at"]


# ----------------- Cart -----------------
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "product", "quantity"]
    search_fields = ["user__username", "product__name"]


# ----------------- OrderItem Inline -----------------
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ["product", "quantity", "price"]


# ----------------- Order -----------------
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "total_price", "status", "created_at"]
    search_fields = ["user__username", "status"]
    list_filter = ["status", "created_at"]
    inlines = [OrderItemInline]
