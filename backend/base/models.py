#TODO - do we need page or generate page title from context?
#  from django.db import models
# from django.utils.text import slugify

# class Page(models.Model):
#   title = models.CharField(max_length=250)
#   is_published = models.BooleanField(default=False)
#   slug = models.SlugField(unique=True, blank=True, max_length=255)

#   def save(self, *args, **kwargs):
#       if not self.slug:
#           self.slug = slugify(self.title)
#           # Ensure uniqueness
#           original_slug = self.slug
#           queryset = Page.objects.filter(slug=self.slug).exclude(id=self.id)
#           count = 1
#           while queryset.exists():
#               self.slug = f'{original_slug}-{count}'
#               count += 1
#       super(Page, self).save(*args, **kwargs)

#   def get_absolute_url(self):
#       return f"/{slugify(self.slug)}/"

#   def __str__(self):
#     return self.title
