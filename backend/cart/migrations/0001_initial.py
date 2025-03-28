# Generated by Django 5.1.1 on 2024-09-20 17:11

import django.db.models.deletion
from django.db import migrations, models
from django.conf import settings
class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0006_alter_product_slug'),
        # ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_list', models.ManyToManyField(to='product.product')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
