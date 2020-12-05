from django.contrib import admin
from app.models import Profile, Equipment, Studio, EquipmentBorrow, StudioBorrow

# Register your models here.
admin.site.register(Profile)
admin.site.register(Equipment)
admin.site.register(Studio)
admin.site.register(EquipmentBorrow)
admin.site.register(StudioBorrow)
