# from django.shortcuts import render, redirect
from app.models import Equipment, EquipmentBorrow, Profile, Studio, StudioBorrow
from django.shortcuts import render, redirect
from django.db.models import Q
# Create your views here.

from django.http import HttpResponse
from .models import CalendarEvent
from project.util import events_to_json, calendar_options
from django.core import serializers
from django.core.paginator import Paginator
from django.views.generic import ListView
import datetime
from django.contrib.auth.decorators import login_required

OPTIONS = """{  timeFormat: "H:mm",
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay',
                },
                allDaySlot: false,
                firstDay: 0,
                weekMode: 'liquid',
                slotMinutes: 15,
                defaultEventMinutes: 30,
                minTime: 8,
                maxTime: 20,
                editable: false,
                dayClick: function(date, allDay, jsEvent, view) {
                    if (allDay) {
                        $('#calendar').fullCalendar('gotoDate', date)
                        $('#calendar').fullCalendar('changeView', 'agendaDay')
                    }
                },
                eventClick: function(event, jsEvent, view) {
                    if (view.name == 'month') {
                        $('#calendar').fullCalendar('gotoDate', event.start)
                        $('#calendar').fullCalendar('changeView', 'agendaDay')
                    }
                },
            }"""


def calendar(request):
    event_url = 'all_events/'
    return render(request, 'calendar.html', {'calendar_config_options': calendar_options(event_url, OPTIONS)})


def all_events(request):
    events = CalendarEvent.objects.all()
    eee = serializers.serialize('json', events)

    equipmentBorrows = EquipmentBorrow.objects.all()
    e = serializers.serialize('json', equipmentBorrows)

    return HttpResponse(events_to_json(events), content_type='application/json')


@login_required(login_url='/rent')
def main(request):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")

    try:
        equipLists = EquipmentBorrow.objects.filter(
            Q(borrowState=0) | Q(borrowState=1)).order_by('fromDate')
        for equip in equipLists:
            now = datetime.datetime.now()
            nowDate = int(now.strftime("%Y-%m-%d").replace("-", ""))
            nowTime = int(now.hour)
            toDate, toDateTime = int(equip.toDate), int(equip.toDateTime)
            if((toDate == nowDate and toDateTime < nowTime) or (toDate < nowDate)):
                lateEquipment = EquipmentBorrow.objects.filter(pk=equip.pk)
                lateEquipment.update(
                    borrowState=2
                )

        state0 = makeLists(EquipmentBorrow.objects.filter(borrowState=0))
        state1 = makeLists(EquipmentBorrow.objects.filter(borrowState=1))
        state2 = makeLists(EquipmentBorrow.objects.filter(borrowState=2))
        return render(request, "main.html", {
            "state0s": state0, "state1s": state1, "state2s": state2
        })
    except:
        return redirect("error")


@login_required(login_url='/rent')
def main_studio(request):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")

    try:
        studioLists = StudioBorrow.objects.filter(
            Q(studioState=0) | Q(studioState=1))
        for studio in studioLists:
            now = datetime.datetime.now()
            nowDate = int(now.strftime("%Y-%m-%d").replace("-", ""))
            nowTime = int(now.hour)
            toDate, toDateTime = int(studio.toDate), int(studio.toDateTime)
            if((toDate == nowDate and toDateTime < nowTime) or (toDate < nowDate)):
                lateStudio = StudioBorrow.objects.filter(pk=studio.pk)
                lateStudio.update(
                    studioState=2
                )

        state0 = makeLists(StudioBorrow.objects.filter(studioState=0))
        state1 = makeLists(StudioBorrow.objects.filter(studioState=1))
        state2 = makeLists(StudioBorrow.objects.filter(studioState=2))
        return render(request, "main_studio.html", {
            "state0s": state0, "state1s": state1, "state2s": state2
        })
    except:
        return redirect("error")


def makeLists(nowState):
    results = []
    if len(nowState) > 0:
        for state in nowState:
            temp = {}
            temp["pk"] = state.pk
            temp["username"] = state.username.name
            temp["major"] = state.username.major
            # temp["equips"] = equipLists
            temp["fromDateYear"] = state.fromDate[:4]
            temp["fromDateMonth"] = state.fromDate[4:6]
            temp["fromDateDay"] = state.fromDate[6:8]
            temp["fromDateTime"] = state.fromDateTime
            temp["toDateYear"] = state.toDate[:4]
            temp["toDateMonth"] = state.toDate[4:6]
            temp["toDateDay"] = state.toDate[6:8]
            temp["toDateTime"] = state.toDateTime
            results.append(temp)
    return results


@login_required(login_url='/rent')
def total(request):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")

    try:
        totalBrrows_all = EquipmentBorrow.objects.all().order_by('toDate')
        query = request.GET.get('query')
        if(query):
            filter_Brrows = list_filter_query(True, query, totalBrrows_all)
            paginator = Paginator(filter_Brrows, 5)
        else:
            paginator = Paginator(totalBrrows_all, 5)
        page = int(request.GET.get('page', 1))
        totalBrrows = paginator.get_page(page)
        if(request.method == "POST"):
            equipPK = "".join(request.POST["equipPK"])
            editEquipList = EquipmentBorrow.objects.filter(pk=equipPK)
            editEquipList.update(
                realDate="".join(request.POST["realDate"]),
                realDateTime="".join(request.POST["realDateTime"]),
                group="".join(request.POST["group"]),
                phone="".join(request.POST["phone"]),
                purpose="".join(request.POST["purpose"]),
                auth="".join(request.POST["auth"]),
                remark="".join(request.POST["remark"]),
                borrowState="".join(request.POST["borrowState"]),
            )
        return render(request, "total.html", {"borrows": totalBrrows, "query": query})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def total_studio(request):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")

    try:
        totalBrrows_all = StudioBorrow.objects.all().order_by('toDate')
        query = request.GET.get('query')
        if(query):
            filter_Brrows = list_filter_query(False, query, totalBrrows_all)
            paginator = Paginator(filter_Brrows, 5)
        else:
            paginator = Paginator(totalBrrows_all, 5)
        page = int(request.GET.get('page', 1))
        totalBrrows = paginator.get_page(page)
        if(request.method == "POST"):
            equipPK = "".join(request.POST["equipPK"])
            editStudioList = StudioBorrow.objects.filter(pk=equipPK)
            editStudioList.update(
                realDate="".join(request.POST["realDate"]),
                realDateTime="".join(request.POST["realDateTime"]),
                group="".join(request.POST["group"]),
                phone="".join(request.POST["phone"]),
                purpose="".join(request.POST["purpose"]),
                auth="".join(request.POST["auth"]),
                remark="".join(request.POST["remark"]),
                studioState="".join(request.POST["borrowState"]),
            )
        return render(request, "total_studio.html", {"borrows": totalBrrows, "query": query})
    except:
        return redirect("error")


def list_filter_query(isEquip, query, totalBrrows):
    results = []
    query = query.upper()
    for brrows in totalBrrows:
        if(isEquip):
            if(query in str(brrows.equipment)):
                results.append(brrows)
                continue
        else:
            if(query in str(brrows.studio)):
                results.append(brrows)
                continue
        if(query in str(brrows.username) or query in str(brrows.fromDate) or query in str(brrows.fromDateTime) or query in str(brrows.toDate) or query in str(brrows.toDateTime) or query in str(brrows.group) or query in str(brrows.purpose) or query in str(brrows.auth) or query in str(brrows.remark)):
            results.append(brrows)
    return results


@login_required(login_url='/rent')
def equipment(request):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")

    try:
        equipments = Equipment.objects.all()
        paginator = Paginator(equipments, 8)
        query = request.GET.get('query')
        if(query):
            filter_equips = manage_filter_query(True, query, equipments)
            paginator = Paginator(filter_equips, 8)
        else:
            paginator = Paginator(equipments, 8)
        page = int(request.GET.get('page', 1))
        totalEquips = paginator.get_page(page)
        if(request.method == "POST"):
            equipType = "".join(request.POST['equipType'])
            equipSemiType = "".join(request.POST['equipSemiType'])
            equipmentName = "".join(request.POST['equipmentName'])
            serialNumber = "".join(request.POST['serialNumber'])
            borrowState = "".join(request.POST['borrowState'])
            remark = "".join(request.POST['remark'])
            equipPK = "".join(request.POST['equipPK'])
            editEquip = Equipment.objects.filter(pk=equipPK)
            editEquip.update(
                equipType=equipType,
                equipSemiType=equipSemiType,
                equipmentName=equipmentName,
                serialNumber=serialNumber,
                borrowState=borrowState,
                remark=remark
            )
        return render(request, "equipment.html", {"equipments": totalEquips})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def studio(request):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        studios = Studio.objects.all()
        query = request.GET.get('query')
        if(query):
            studios = manage_filter_query(False, query, studios)
        if(request.method == "POST"):
            studioType = "".join(request.POST['studioType'])
            studioName = "".join(request.POST['studioName'])
            borrowState = "".join(request.POST['borrowState'])
            remark = "".join(request.POST['remark'])
            studioPK = "".join(request.POST['studioPK'])

            editStudio = Studio.objects.filter(pk=studioPK)
            editStudio.update(
                studioType=studioType,
                studioName=studioName,
                borrowState=borrowState,
                remark=remark
            )
        return render(request, "studio.html", {"studios": studios})
    except Exception as ex:
        print("에러",ex)
        return redirect("error")

def manage_filter_query(isEquip, query, equipments):
    results = []
    query = query.upper()
    for equipment in equipments:
        if(isEquip):
            if(query in str(equipment.equipmentName) or query in str(equipment.equipType) or query in str(equipment.equipSemiType) or query in str(equipment.serialNumber)):
                results.append(equipment)
                continue
        else:
            if(query in str(equipment.studioName) or query in str(equipment.studioType)):
                results.append(equipment)
                continue
        if( query in str(equipment.remark )):
            results.append(equipment)
    return results


@login_required(login_url='/rent')
def studioBorrow(request, studio_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        studio = StudioBorrow.objects.filter(pk=studio_pk)
        studio.update(studioState=1, alba=request.user.profile.name)
        return render(request, 'studio_alert.html', {"msg": "정상적으로 대여 처리 하였습니다."})
    except:
        return render(request, 'studio_alert.html', {"msg": "정상적으로 대여 처리 하지 못했습니다."})


@login_required(login_url='/rent')
def studioReturn(request, studio_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        studio = StudioBorrow.objects.filter(pk=studio_pk)
        studio.update(studioState=3, alba=request.user.profile.name)
        return render(request, 'studio_alert.html', {"msg": "정상적으로 반납 처리 하였습니다."})
    except:
        return render(request, 'studio_alert.html', {"msg": "정상적으로 반납 처리 하지 못했습니다."})


@login_required(login_url='/rent')
def equipment_qr(request, equipment_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")

    try:
        currentEquipment = Equipment.objects.get(pk=equipment_pk)
        return render(request, "equipment_qr.html", {"currentEquipment": currentEquipment})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def qrcheckBrrow(request, post_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")

    try:
        currentEquipment = EquipmentBorrow.objects.filter(pk=post_pk)
        if request.method == "POST":
            equipments = request.POST['equipments']
            for equipment in equipments.split("@@"):
                [eName, eNumber, eType, eSemiType] = equipment.split("^")
                eType = eType.replace("\ufeff", "")
                EquipmentState = Equipment.objects.filter(
                    Q(equipType=eType), Q(serialNumber=eNumber))
                EquipmentState.update(
                    borrowState=1
                )
            currentEquipment.update(
                alba=request.user.profile.name,
                equipmentList=equipments, borrowState=1)
            return redirect('adminMain')
        return render(request, "qrcheckBorrow.html", {'currentEquipment': currentEquipment[0]})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def qrcheckReturn(request, post_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")

    try:
        currentEquipment = EquipmentBorrow.objects.filter(pk=post_pk)
        if request.method == "POST":
            equipments = request.POST['equipments']
            
            for equipment in equipments.split("@@"):
                [eName, eNumber, eType, eSemiType] = equipment.split("^")
                eType = eType.replace("\ufeff", "")
                EquipmentState = Equipment.objects.filter(
                    Q(equipType=eType), Q(serialNumber=eNumber))
                now = datetime.datetime.now()
                EquipmentState.update(
                    borrowState=0
                )
            realDate = int(now.strftime("%Y-%m-%d").replace("-", ""))
            realDateTime = int(now.hour)
            currentEquipment.update(
                alba=request.user.profile.name,
                equipmentList=equipments, realDate=realDate, realDateTime=realDateTime, borrowState=3)

            return redirect('adminMain')
        return render(request, "qrcheckReturn.html", {'currentEquipment': currentEquipment[0]})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def qrcheckLate(request, post_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        currentEquipment = EquipmentBorrow.objects.filter(pk=post_pk)
        if request.method == "POST":
            equipments = request.POST['equipments']
            for equipment in equipments.split("@@"):
                [eType, eSemiType, eName, eNumber] = equipment.split("^")
                eType = eType.replace("\ufeff", "")
                EquipmentState = Equipment.objects.filter(
                    Q(equipmentName=eName), Q(equipType=eType), Q(serialNumber=eNumber))
                EquipmentState.update(
                    borrowState=0
                )
            currentEquipment.update(
                alba=request.user.profile.name,
                equipmentList=equipments, borrowState=3)
            return redirect('adminMain')
        return render(request, "qrcheckLate.html", {'currentEquipment': currentEquipment[0]})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def addEquipment(request):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        if request.method == 'POST':
            foundEquipByserial = Equipment.objects.filter(
                serialNumber=request.POST['serialNumber'])
            if len(foundEquipByserial) == 0:
                Equipment.objects.create(
                    equipmentName=request.POST['equipmentName'],
                    serialNumber=request.POST['serialNumber'],
                    equipType=request.POST['equipType'],
                    equipSemiType=request.POST['equipSemiType'],
                    isExist=True,
                    borrowState=0
                )
                return redirect('equipment')
            else:
                error = '이미 존재하는 serial number 입니다.'
                return render(request, 'error.html', {"msg": error})
        return render(request, "addEquipment.html")
    except:
        return redirect("error")


@login_required(login_url='/rent')
def addStudio(request):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")

    try:
        if request.method == 'POST':
            Studio.objects.create(
                studioName=request.POST['studioName'],
                studioType=request.POST['studioType'],
                isExist=True,
                studioState=0
            )
            return redirect('studio')
        return render(request, "addstudio.html")
    except:
        return redirect("error")


# 장비대여 리스트 수정 및 삭제
@login_required(login_url='/rent')
def deleteTotal(request, equipment_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        deleteEquipList = EquipmentBorrow.objects.get(pk=equipment_pk)
        deleteEquipList.delete()
        return redirect('total')
    except:
        return redirect("error")


@login_required(login_url='/rent')
def detailTotal(request, equipment_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        EquipList = EquipmentBorrow.objects.get(pk=equipment_pk)
        return render(request, 'detailTotal.html', {'EquipList': EquipList})
    except:
        return redirect("error")

# 공간대여 리스트 수정 및 삭제


@login_required(login_url='/rent')
def deleteTotalStudio(request, equipment_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        deleteStudioList = StudioBorrow.objects.get(pk=equipment_pk)
        deleteStudioList.delete()
        return redirect('total_studio')
    except:
        return redirect("error")


@login_required(login_url='/rent')
def detailTotalStudio(request, equipment_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        StudioList = StudioBorrow.objects.get(pk=equipment_pk)
        return render(request, 'detailTotalStudio.html', {'StudioList': StudioList})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def deleteEquipment(request, equipment_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        deleteEquipment = Equipment.objects.get(pk=equipment_pk)
        deleteEquipment.delete()
        return redirect('equipment')
    except:
        return redirect("error")


@login_required(login_url='/rent')
def detailEquipment(request, equipment_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        equipment = Equipment.objects.get(pk=equipment_pk)
        return render(request, 'detailEquipment.html', {'Equipment': equipment})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def brokenEquipment(request, equipment_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        Equipment.objects.filter(pk=equipment_pk).update(isExist=False)
        equipment = Equipment.objects.get(pk=equipment_pk)
        return render(request, 'detailEquipment.html', {'Equipment': equipment})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def repairEquipment(request, equipment_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        Equipment.objects.filter(pk=equipment_pk).update(isExist=True)
        equipment = Equipment.objects.get(pk=equipment_pk)
        return render(request, 'detailEquipment.html', {'Equipment': equipment})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def deleteStudio(request, studio_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        deleteStudio = Studio.objects.get(pk=studio_pk)
        deleteStudio.delete()
        return redirect('studio')
    except:
        return redirect("error")


@login_required(login_url='/rent')
def detailStudio(request, studio_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        studio = Studio.objects.get(pk=studio_pk)
        return render(request, 'detailStudio.html', {'studio': studio})
    except Exception as ex: # 에러 종류
        print('에러가 발생 했습니다', ex)
        return redirect("error")


@login_required(login_url='/rent')
def brokenStudio(request, studio_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        Studio.objects.filter(pk=studio_pk).update(isExist=False)
        studio = Studio.objects.get(pk=studio_pk)
        return render(request, 'detailStudio.html', {'studio': studio})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def repairStudio(request, studio_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        Studio.objects.filter(pk=studio_pk).update(isExist=True)
        studio = Studio.objects.get(pk=studio_pk)
        return render(request, 'detailStudio.html', {'studio': studio})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def adminAuth(request):
    try:
        if request.user.profile.isAuth != 2:
            return render(request, 'alert.html', {"msg": "권한이 없습니다."})
        else:
            users = Profile.objects.all()
            return render(request, "adminAuth.html", {"users": users})
    except:
        return redirect("error")


@login_required(login_url='/rent')
def adminAddAuth(request, user_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        Profile.objects.filter(pk=user_pk).update(isAuth=1)
        return redirect('adminAuth')
    except:
        return redirect("error")


@login_required(login_url='/rent')
def adminDeleteAuth(request, user_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        Profile.objects.filter(pk=user_pk).update(isAuth=0)
        return redirect('adminAuth')
    except:
        return redirect("error")


@login_required(login_url='/rent')
def adminAddSuperAuth(request, user_pk):
    try:
        if request.user.profile.isAuth == 0:
            return render(request, "alert.html", {"msg": "권한이 없습니다."})
    except:
        return redirect("main")
    try:
        Profile.objects.filter(pk=user_pk).update(isAuth=2)
        return redirect('adminAuth')
    except:
        return redirect("error")
