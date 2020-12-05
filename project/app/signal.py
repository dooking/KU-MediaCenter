from django.dispatch import receiver
from django.db.models.signals import post_save
from app.models import Profile, EquipmentBorrow
from adminpage.models import CalendarEvent
from django.contrib.auth.models import User


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.first_name:
            userInfo = instance.first_name.split('[')
            newProfile = Profile(
                username=instance,
                name=userInfo[0],
                major='['+userInfo[1],
                state=0,
                penalty=0,
                isAuth=0
            )
            newProfile.save()


@ receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if instance.first_name:
        instance.profile.save()


@ receiver(post_save, sender=EquipmentBorrow)
def create_calendar_event(sender, instance, created, **kwargs):
    if created:
        print(instance)
