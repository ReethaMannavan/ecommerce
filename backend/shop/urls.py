from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, CategoryViewSet, ProductViewSet, ReviewViewSet, CartViewSet, OrderViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

# DRF router for ModelViewSets
router = DefaultRouter()
router.register(r"categories", CategoryViewSet)
router.register(r"products", ProductViewSet)
router.register(r"reviews", ReviewViewSet)
router.register(r"cart", CartViewSet)
router.register(r"orders", OrderViewSet)

# Auth URLs
auth_urls = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

# Combine all URLs
urlpatterns = [
    path("", include(router.urls)),  # API routes
    path("", include(auth_urls)),    # Auth routes
]
