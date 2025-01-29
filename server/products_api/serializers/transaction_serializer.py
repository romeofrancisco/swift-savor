from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from ..models import OrderProduct, Payment, Transaction
from decimal import Decimal

class OrderProductSerializer(serializers.ModelSerializer):
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = OrderProduct
        fields = ['product','product_name','product_price','quantity','total']


class PaymentSerializer(serializers.ModelSerializer):
    change = serializers.DecimalField(read_only=True, max_digits=10, decimal_places=2)
    
    class Meta:
        model = Payment
        fields = ['amount','change']
        
class TransactionSerializer(serializers.ModelSerializer):
    orders = OrderProductSerializer(many=True)
    payment = PaymentSerializer()
    total = serializers.DecimalField(read_only=True, max_digits=10, decimal_places=2)
    subTotal = serializers.DecimalField(read_only=True, max_digits=10, decimal_places=2)
    tax = serializers.DecimalField(read_only=True, max_digits=10, decimal_places=2)
    cashier_name = serializers.CharField(max_length=50, read_only=True)
    date = serializers.DateTimeField(format="%B %d, %Y, %I:%M %p", read_only=True)
    

    class Meta:
        model = Transaction
        fields = ['id', 'cashier', 'cashier_name', 'total', 'orders', 'payment', 'date', 'tax', 'subTotal']
        read_only_fields = ['total', 'tax']

    def create(self, validated_data):
        order_data = validated_data.pop('orders')
        payment_data = validated_data.pop('payment')

        # Calculate the total for the transaction
        total = 0
        order_instances = []
        for order in order_data:
            product = order['product']
            quantity = order['quantity']

            # Check if the product has enough stock
            if product.stock < quantity:
                raise ValidationError({
                    "orders": f"Insufficient stock for product {product.name}. Available stock: {product.stock}"
                })

            # Decrement the product stock
            product.stock -= quantity
            product.save()

            order_total = product.price * quantity
            total += order_total
            order_instances.append(OrderProduct(
                product=product,
                quantity=quantity,
                total=order_total,
            ))
        
        tax = total * Decimal('0.12')
        subTotal = total - tax
        
        amount = payment_data.get('amount', 0)
        if amount < total:
            raise ValidationError({"payment": "Payment amount must not be less than the total cost."})

        # Create the main transaction instance
        transaction = Transaction.objects.create(total=total, subTotal=subTotal, tax=tax, **validated_data)

        # Save the OrderProduct instances
        for order_instance in order_instances:
            order_instance.transaction = transaction
            order_instance.save()

        # Calculate and save the payment
        change = amount - total
        Payment.objects.create(transaction=transaction, amount=amount, change=change)

        return transaction
