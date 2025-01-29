from django.contrib import admin
from .models import Category, Product, Transaction, OrderProduct, Payment

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'stock', 'created')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created')

# Inline for OrderProduct
class OrderProductInline(admin.TabularInline):
    model = OrderProduct
    extra = 0  # Don't show extra empty forms
    fields = ('product_name', 'quantity', 'total',) 
    readonly_fields = ('product_name', 'quantity', 'total',)  # Display product name
    can_delete = False

    def product_name(self, obj):
        """Display product name instead of object."""
        return obj.product.name if obj.product else "No Product"
    
    product_name.short_description = 'Product'

# Inline for Payment
class PaymentInline(admin.StackedInline):
    model = Payment
    extra = 0
    readonly_fields = ('amount', 'change')  # Make fields read-only
    can_delete = False

# Custom admin for Transaction
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'total', 'date', 'payment_summary')  # Display columns in list view
    inlines = [OrderProductInline, PaymentInline]  # Include inlines for OrderProduct and Payment
    
    def payment_summary(self, obj):
        """Display payment summary (amount and change)."""
        payment = obj.payment
        return f"Amount: {payment.amount}, Change: {payment.change}" if payment else "No payment"
    
    payment_summary.short_description = 'Payment Details'

    readonly_fields = ('total', )  # Make the transaction fields read-only
    search_fields = ['id', 'date']  # Make search available by id or date
    
