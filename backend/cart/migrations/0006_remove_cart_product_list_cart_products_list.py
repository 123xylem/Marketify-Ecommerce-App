# Generated by Django 5.1.1 on 2024-10-08 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0005_cartitem_alter_cart_product_list'),
        ('product', '0007_alter_product_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='product_list',
        ),
        migrations.AddField(
            model_name='cart',
            name='products_list',
            field=models.ManyToManyField(through='cart.CartItem', to='product.product'),
        ),
    ]
