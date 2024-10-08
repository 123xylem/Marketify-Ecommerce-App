# Generated by Django 5.1.1 on 2024-09-23 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0003_alter_cart_user'),
        ('product', '0006_alter_product_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='product_list',
            field=models.ManyToManyField(related_name='cart_products', to='product.product'),
        ),
    ]
