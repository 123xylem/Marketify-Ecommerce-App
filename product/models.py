from django.db import models
from django.dispatch import receiver
from versatileimagefield.fields import VersatileImageField, PPOIField
from versatileimagefield.placeholder import OnStoragePlaceholderImage
from versatileimagefield.image_warmer import VersatileImageFieldWarmer
from django.utils.timezone import timezone, datetime
from django.utils.safestring import mark_safe
from django.utils.html import escape

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
  category = models.ManyToManyField(Category, blank=True)
  title = models.CharField(max_length=40, unique=True)
  slug = models.CharField(max_length=100, blank=True, null=True)
  image = VersatileImageField(
        'Image',
        upload_to='images/products/',
        blank=True,
        placeholder_image=OnStoragePlaceholderImage(
        path='images/placeholder.jpg')
  )
  description = models.TextField(default='The Product Description is here')
  created_at = models.TimeField(default=datetime.now)
  price = models.DecimalField(max_digits=6, decimal_places=2, default=9.99)
  class Meta:
    ordering = ["title"]

  def __str__(self):
      return self.title
  
  def image_tag(self):
    return mark_safe(f'<img src="{escape(self.image.url)}" width="50" height="50" />')
  image_tag.short_description = 'Image'
  image_tag.allow_tags = True


@receiver(models.signals.post_save, sender=Product)
def warm_product_list_img(sender, instance, **kwargs):
    """Ensures Product List images are created post-save"""
    product_img_warmer = VersatileImageFieldWarmer(
        instance_or_queryset=instance,
        rendition_key_set='product_grid_image',
        image_attr='image'
    )
    num_created, failed_to_create = product_img_warmer.warm()
