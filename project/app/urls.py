from django.contrib import admin
from django.urls import path, include
from app import views


urlpatterns = [
    
    path("", views.main, name="main"),

    # 2-Introduce
    path("introduce/", views.introduce, name="introduce"),
    path("check_intro/equip", views.check_intro_equip, name="check_intro_equip"),
    path("check_intro/studio", views.check_intro_studio, name="check_intro_studio"),

    # 3-Borrow
    path("borrow/", views.borrow_step1, name="borrow_step1"),
    path("borrow/step2", views.borrow_step2, name="borrow_step2"),
    path("borrow/finish", views.borrow_finish, name="borrow_finish"),
    path("studio/", views.studio_step1, name="studio_step1"),
    path("studio/step2", views.studio_step2, name="studio_step2"),
    path("studio/finish", views.studio_finish, name="studio_finish"),
    
    # 5-mypage
    path("mypage/", views.mypage, name="mypage"),
    path("lastReservation/", views.lastReservation, name="lastReservation"),
    path("cancelEquip/<int:eb_pk>", views.cancelEquip, name="cancelEquip"),
    path("cancelStudio/<int:sb_pk>", views.cancelStudio, name="cancelStudio"),
    path("accounts/", include("allauth.urls")),
    path("error/", views.error, name="error"),
    path("logout", views.logout, name="logout"),
    ]


