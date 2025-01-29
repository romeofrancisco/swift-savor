from .models import Category, Product, Transaction
from .serializers import CategorySerializer, ProductSerializer, TransactionSerializer
from rest_framework import generics
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination
from datetime import datetime, timedelta
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from .services.sales import SalesService

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductPagination(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ['name', 'category', 'price', 'stock', 'created']
    ordering = ['name']
    
    def get_queryset(self):
        queryset = Product.objects.all()
        ordering = self.request.query_params.get('ordering', self.ordering)
        queryset = queryset.order_by(ordering)
        return queryset

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = None
    
    def get_queryset(self):
        queryset = Product.objects.all()
        category_id = self.request.query_params.get('category', None)
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)
        return queryset

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    
class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    
    class Pagination(PageNumberPagination):
        page_size = 20
    pagination_class = Pagination
    
    def get_queryset(self):
        queryset = super().get_queryset()
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")
        
        # Filter transactions for the logged-in cashier
        if self.request.user.role == "Employee":
            queryset = queryset.filter(cashier=self.request.user)

        if start_date and end_date:
            try:
                # Parse start_date and end_date to datetime
                start_date = datetime.strptime(start_date.strip(), "%Y-%m-%d")
                end_date = datetime.strptime(end_date.strip(), "%Y-%m-%d")
                
                # Extend end_date to the end of the day
                end_date = end_date + timedelta(days=1) - timedelta(seconds=1)

                # Apply the date range filter
                queryset = queryset.filter(date__range=[start_date, end_date])
            except ValueError:
                raise ValidationError("Invalid date format. Please use YYYY-MM-DD.")
        elif start_date:
            try:
                start_date = datetime.strptime(start_date.strip(), "%Y-%m-%d")
                queryset = queryset.filter(date__gte=start_date)
            except ValueError:
                raise ValidationError("Invalid start date format. Please use YYYY-MM-DD.")
        
        return queryset.order_by('-date')
    
class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    
# TRANSACTIONS CHART

class ChartView(APIView):
    def get(self, request, *args, **kwargs):
        total_orders = SalesService.get_total_order()
        total_items = SalesService.get_total_items()
        daily_sales = SalesService.get_daily_sales()
        weekly_sales = SalesService.get_weekly_sales()
        yearly_sales = SalesService.get_yearly_sales()
        sales_statistics = SalesService.get_monthly_sales()
        top_selling_items = SalesService.get_top_selling_items()
        employee_sales = SalesService.get_employee_monthly_sales()
        category_sales = SalesService.get_top_selling_categories()
        
        chart = {
            "total_orders": total_orders,
            "total_items": total_items,
            "daily_sales": daily_sales,
            "weekly_sales": weekly_sales,
            "yearly_sales": yearly_sales,
            "sales_statistics": sales_statistics,
            "top_selling_items": top_selling_items,
            "employee_sales": employee_sales,
            "category_sales": category_sales,
        }
        return Response(chart)