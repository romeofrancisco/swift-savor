# Generated by Django 5.1.3 on 2025-01-18 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products_api', '0005_product_category_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='subTotal',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='transaction',
            name='tax',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='category_name',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
