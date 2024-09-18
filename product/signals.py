
from django.db.models.signals import pre_save
from django.utils.text import slugify
from .models import Product

#Make slug for product and if slug exists recursively make a new slug with id appeneded
def create_product_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = Product.objects.filter(slug=slug).order_by('-id')
    exists = qs.exists()
    if exists:
        new_slug = f"{slug}-{qs.first().id}"
        return create_product_slug(instance, new_slug=new_slug)
    return slug

def pre_save_product_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_product_slug(instance)

pre_save.connect(pre_save_product_receiver, sender=Product)
