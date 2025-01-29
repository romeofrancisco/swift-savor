from django.urls import path
from .views import CategoryList, CategoryDetail, ProductList, ProductPagination, ProductDetail, TransactionList, TransactionDetail, ChartView

urlpatterns = [
    path("categories", CategoryList.as_view()),
    path("categories/<int:pk>", CategoryDetail.as_view()),
    path("all-products", ProductList.as_view()),
    path("products", ProductPagination.as_view()),
    path("products/<str:pk>", ProductDetail.as_view()),
    path("transactions", TransactionList.as_view()),
    path("transactions/<str:pk>", TransactionDetail.as_view()),
    # Services
    path("chart", ChartView.as_view()),
]

