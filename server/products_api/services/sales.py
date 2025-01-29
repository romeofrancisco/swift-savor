from datetime import datetime, timedelta
from django.db.models.functions import ExtractMonth, ExtractYear, ExtractDay
from django.db.models import Sum, Count
from django.utils.timezone import now
from ..models import Transaction, OrderProduct, Product
from auth_api.models import User
from collections import Counter

class SalesService:
    @staticmethod    
    def get_monthly_sales():
        today = datetime.now()

        months = []
        for i in range(5, -1, -1):
            month = (today.month - i) % 12 or 12
            year = today.year if today.month - i > 0 else today.year - 1
            months.append({"month": month, "year": year})

        # Filter transactions within the last 6 months
        start_date = datetime(months[0]["year"], months[0]["month"], 1)
        sales_by_month = (
            Transaction.objects.filter(date__gte=start_date)
            .annotate(month=ExtractMonth('date'), year=ExtractYear('date'))
            .values('month', 'year')
            .annotate(total_sales=Sum('total'))
            .order_by('year', 'month')
        )

        # Prepare chart data with month and year names
        month_year_names = [
            datetime(m["year"], m["month"], 1).strftime("%B %Y") for m in months
        ]
        chart_data = [{"month": name, "Sales": 0} for name in month_year_names]

        # Map sales data to chart data
        for data in sales_by_month:
            month_year_name = datetime(data["year"], data["month"], 1).strftime("%B %Y")
            for entry in chart_data:
                if entry["month"] == month_year_name:
                    entry["Sales"] = data["total_sales"]
                    break

        return chart_data
    
    def get_top_selling_items():
        # Fetch all transactions, with related OrderProduct objects
        transactions = Transaction.objects.prefetch_related('orders').all()

        # Counter to aggregate product sales
        product_sales = Counter()

        for transaction in transactions:
            # Access the related orders for this transaction
            orders = transaction.orders.all()

            for order in orders:
                product_name = order.product_name  # Name of the product sold
                quantity = order.quantity  # Quantity of the product sold
                
                # Add to the product_sales counter
                if product_name:
                    product_sales[product_name] += quantity

        # Get the top 5 selling products
        top_5_items = product_sales.most_common(5)

        # Format the result
        result = [{"item": name, "total_sales": total} for name, total in top_5_items]

        return result
    
    def get_employee_monthly_sales():
        today = datetime.now()

        months = []
        for i in range(5, -1, -1):
            month = (today.month - i) % 12 or 12
            year = today.year if today.month - i > 0 else today.year - 1
            months.append({"month": month, "year": year})

        # Filter transactions within the last 6 months
        start_date = datetime(months[0]["year"], months[0]["month"], 1)
        sales_by_month_employee = (
            Transaction.objects.filter(date__gte=start_date, cashier__role=User.Role.employee)
            .annotate(month=ExtractMonth('date'), year=ExtractYear('date'))
            .values('month', 'year', 'cashier__username')
            .annotate(total_sales=Sum('total'))
            .order_by('year', 'month', 'cashier__username')
        )

        # Prepare chart data with month, year, and employee names
        month_year_names = [
            datetime(m["year"], m["month"], 1).strftime("%B %Y") for m in months
        ]
        employees = set(t['cashier__username'] for t in sales_by_month_employee)
        
        chart_data = [
            {"month": name, **{employee: 0 for employee in employees}}
            for name in month_year_names
        ]

        # Map sales data to chart data
        for data in sales_by_month_employee:
            month_year_name = datetime(data["year"], data["month"], 1).strftime("%B %Y")
            for entry in chart_data:
                if entry["month"] == month_year_name:
                    entry[data['cashier__username']] = data['total_sales']
                    break

        return chart_data

    def get_top_selling_categories():
        # Aggregate total quantity of products sold by category
        category_sales = (
            OrderProduct.objects
            .filter(product__category__isnull=False)  # Ensure the product has a category
            .values('product__category__name')  # Group by category name
            .annotate(total_sales=Sum('quantity'))  # Sum quantity for each category
            .order_by('-total_sales')  # Order by total quantity sold, descending
        )

        # Get the top 5 selling categories
        top_5_categories = category_sales[:5]

        # Format the result
        result = [
            {"category": category["product__category__name"], "total_sales": category["total_sales"]}
            for category in top_5_categories
        ]

        return result

    def get_total_order():
        return Transaction.objects.count()
    
    def get_total_items():
        return Product.objects.count()
    
    def get_daily_sales():
        today = now().date()  # Get today's date
        sales_today = Transaction.objects.filter(date__date=today).aggregate(total_sales=Sum('total'))
        return sales_today['total_sales'] or 0 
        
    def get_weekly_sales():
        today = now().date()
        start_of_week = today - timedelta(days=today.weekday())  # Monday of the current week
        end_of_week = start_of_week + timedelta(days=6)  # Sunday of the current week

        sales_this_week = Transaction.objects.filter(date__date__range=(start_of_week, end_of_week)).aggregate(
            total_sales=Sum('total')
        )
        return sales_this_week['total_sales'] or 0  # Return 0 if no sales are found

    
    def get_yearly_sales():
        current_year = now().year  # Get the current year
        sales_this_year = Transaction.objects.filter(date__year=current_year).aggregate(
            total_sales=Sum('total')
        )
        return sales_this_year['total_sales'] or 0  # Return 0 if no sales are found