from django.contrib import admin
from django.urls import path, include
from adminpage import views


urlpatterns = [
    # main
    path('main', views.main, name='adminMain'),
    path('main_studio', views.main_studio, name='main_studio'),

    # 장비대여목록 전체
    path('total', views.total, name='total'),
    path('deleteTotal/<int:equipment_pk>',
         views.deleteTotal, name="deleteTotal"),
    path('detailTotal/<int:equipment_pk>',
         views.detailTotal, name="detailTotal"),

    # 공간대여목록 전체
    path('total_studio', views.total_studio, name='total_studio'),
    path('deleteTotalStudio/<int:equipment_pk>',
         views.deleteTotalStudio, name="deleteTotalStudio"),
    path('detailTotalStudio/<int:equipment_pk>',
         views.detailTotalStudio, name="detailTotalStudio"),

    # 장비 추가 및 삭제
    path('equipment', views.equipment, name='equipment'),
    path('addequipment', views.addEquipment, name='addEquipment'),
    path('equipment_qr/<int:equipment_pk>',
         views.equipment_qr, name='equipment_qr'),
    path('deleteequipment/<int:equipment_pk>',
         views.deleteEquipment, name="deleteEquipment"),
    path('detailEquipment/<int:equipment_pk>',
         views.detailEquipment, name="detailEquipment"),
    path('brokenEquipment/<int:equipment_pk>',
         views.brokenEquipment, name="brokenEquipment"),
    path('repairEquipment/<int:equipment_pk>',
         views.repairEquipment, name="repairEquipment"),

    # 공간 추가 및 삭제
    path('studio', views.studio, name='studio'),
    path('addstudio', views.addStudio, name='addStudio'),
    path('deletestudio/<int:studio_pk>',
         views.deleteStudio, name="deleteStudio"),
    path('detailstudio/<int:studio_pk>',
         views.detailStudio, name="detailStudio"),
    path('brokenstudio/<int:studio_pk>',
         views.brokenStudio, name="brokenStudio"),
    path('repairstudio/<int:studio_pk>',
         views.repairStudio, name="repairStudio"),

    # 장비 대여 예약 확인 및 관리
    path('qrcheck/borrow/<int:post_pk>',
         views.qrcheckBrrow, name='qrcheckBrrow'),
    path('qrcheck/return/<int:post_pk>',
         views.qrcheckReturn, name='qrcheckReturn'),
    path('qrcheck/late/<int:post_pk>',
         views.qrcheckLate, name='qrcheckLate'),
    path('studio/borrow/<int:studio_pk>',
         views.studioBorrow, name="studioBorrow"),
    path('studio/return/<int:studio_pk>',
         views.studioReturn, name="studioReturn"),

    #     # calendar
    #     path('calendar', views.calendar, name='calendar'),
    #     path('all_events/', views.all_events, name='all_events'),

    # 관리자 권한 부여
    path('adminAuth', views.adminAuth, name='adminAuth'),
    path('adminAddAuth/<int:user_pk>', views.adminAddAuth, name='adminAddAuth'),
    path('adminDeleteAuth/<int:user_pk>',
         views.adminDeleteAuth, name="adminDeleteAuth"),

]
