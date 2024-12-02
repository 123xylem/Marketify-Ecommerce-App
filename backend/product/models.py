from typing import Literal
from django.db import models
from django.dispatch import receiver
# from versatileimagefield.fields import VersatileImageField, PPOIField
# from versatileimagefield.placeholder import OnStoragePlaceholderImage
# from versatileimagefield.image_warmer import VersatileImageFieldWarmer
from django.utils.timezone import timezone, datetime
from django.utils.safestring import SafeText, mark_safe
from django.utils.html import escape
from django.utils.text import slugify
from cloudinary.models import CloudinaryField

# Create your models here.
class Category(models.Model):
  title = models.CharField(max_length=30)
  parent = models.ForeignKey(
          "self",
          related_name="subcategories",
          on_delete=models.CASCADE,
          blank=True,
          null=True,
      )
  class Meta:
    ordering = ["title"]
    verbose_name_plural = "categories"

  def __str__(self):
      return self.title

class Product(models.Model):
  category = models.ManyToManyField(Category, blank=True, related_name="categories")
  title = models.CharField(max_length=40, unique=True)
  slug = models.CharField(max_length=100, blank=True, null=True)
  # image = VersatileImageField(
  #       'Image',
  #       upload_to='images/products/',
  #       blank=True,
  #       placeholder_image=OnStoragePlaceholderImage(
  #       path='images/placeholder.jpg')
  # )
  # image = models.ImageField('products/', blank=True)
  image = CloudinaryField('image', use_filename=True, blank=True, null=True)
  # placeholder_image = CloudinaryField('placeholder', path='images/placeholder.jpg')

  description = models.TextField(default='The Product Description is here')
  created_at = models.TimeField(default=datetime.now)
  price = models.DecimalField(max_digits=6, decimal_places=2, default=9.99)
  class Meta:
    ordering = ["title"]

  def __str__(self):
      return self.title
  
  def image_tag(self) -> SafeText | Literal['']:
    return mark_safe(f'<img src="{escape(self.image.url)}" width="50" height="50" />') if self.image else ''
  image_tag.short_description = 'Image'
  image_tag.allow_tags = True

  #Auto save slug as product title with number if duplicate
  def save(self, *args, **kwargs):
    if not self.slug:
        self.slug = slugify(self.title)
        # Ensure uniqueness
        original_slug = self.slug
        queryset = Product.objects.filter(slug=self.slug).exclude(id=self.id)
        count = 1
        while queryset.exists():
            self.slug = f'{original_slug}-{count}'
            count += 1
    super(Product, self).save(*args, **kwargs)



# @receiver(models.signals.post_save, sender=Product)
# def warm_products_list_img(sender, instance, **kwargs):
#     """Ensures Product List images are created post-save"""
#     product_img_warmer = VersatileImageFieldWarmer(
#         instance_or_queryset=instance,
#         rendition_key_set='product_grid_image',
#         image_attr='image'
#     )
#     num_created, failed_to_create = product_img_warmer.warm()
