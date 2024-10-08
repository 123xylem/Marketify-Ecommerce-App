from django.contrib import admin
from .models import GlobalSiteContent

class GlobalSiteContentAdmin(admin.ModelAdmin):
    list_display = ["title", "slug", "created_at"]



admin.site.register(GlobalSiteContent,GlobalSiteContentAdmin )
