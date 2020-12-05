from .models import Profile, Equipment, Studio, EquipmentBorrow, StudioBorrow
from django.db.models import Q

def ResultObject(lists, selectDate, isEquip):
    resultObject = []
    for reserveType in lists:
        if(isEquip):
            equipTypeList = Equipment.objects.filter(
                equipType=reserveType['equipType']).values('equipmentName').distinct()
            resultObject.append(
                findName(equipTypeList, reserveType['equipType'], selectDate, isEquip))
        else:
            studioTypeList = Studio.objects.filter(
                studioType=reserveType['studioType']).values('studioName').distinct()
            resultObject.append(
                findName(studioTypeList, reserveType['studioType'], selectDate, isEquip))
    return resultObject


def findName(reserveTypeLists, semiType, selectDate, isEquip):
    totalInfo = []
    for reserveTypeList in reserveTypeLists:
        if(isEquip):
            totalInfo.append(
                makeDict((reserveTypeList['equipmentName']), semiType, selectDate, isEquip))
        else:
            totalInfo.append(
                makeDict((reserveTypeList['studioName']), semiType, selectDate, isEquip))
    result = {"type": semiType, "info": totalInfo}
    return result


def makeDict(Ename, semiType, selectDate, isEquip):
    dictEquip = {}
    if(isEquip):
        equipList = Equipment.objects.filter(isExist=True, equipmentName=Ename)
        dictEquip["name"] = Ename
        dictEquip["count"] = len(equipList)
        dictEquip["time1"], dictEquip["time2"] = findEquipTime(
            Ename, selectDate, len(equipList))
    else:
        equipList = Studio.objects.filter(isExist=True, studioName=Ename)
        dictEquip["name"] = Ename
        dictEquip["count"] = len(equipList)
        dictEquip["time1"], dictEquip["time2"] = findStudioTime(
            Ename, selectDate, len(equipList))
    return dictEquip


def findStudioTime(Ename, Eto, Ecount):
    todayTime = [Ecount for i in range(24)]
    tomorrowTime = [Ecount for i in range(24)]
    # 오늘 현황 (오늘 반납할 사람 + 빌리는 사람)
    todayReturn = StudioBorrow.objects.filter(
        Q(fromDate=str(int(Eto)-1)), Q(toDate=Eto), (Q(studioState=0) | Q(studioState=1)| Q(studioState=2)))
    todayBorrow = StudioBorrow.objects.filter(Q(fromDate=Eto),(Q(studioState=0) | Q(studioState=1)| Q(studioState=2)))
    # 어제 빌림 -> 오늘 반납
    for borrowList in todayReturn:
        for equipList in borrowList.studio.split("//"):
            equipList = equipList.strip()
            if(equipList == Ename):
                for j in range(borrowList.toDateTime+2):
                    todayTime[j] -= 1
    # 오늘 빌림
    for borrowList in todayBorrow:
        for equipList in borrowList.studio.split("//"):
            equipList = equipList.strip()
            if(equipList == Ename):
                # 내일 반납
                if(int(borrowList.fromDate) < int(borrowList.toDate)):
                    for j in range(borrowList.toDateTime+2):
                        tomorrowTime[j] -= 1
                    for j in range(borrowList.fromDateTime, 24, 1):
                        todayTime[j] -= 1
                # 오늘 반납
                else:
                    for j in range(borrowList.fromDateTime, borrowList.toDateTime+2):
                        todayTime[j] -= 1
    # 내일 현황 (내일기준 빌리는사람)
    tomorrowBorrow = StudioBorrow.objects.filter(Q(fromDate=str(int(Eto)+1)),(Q(studioState=0) | Q(studioState=1)| Q(studioState=2)))
    for borrowList in tomorrowBorrow:
        for equipList in borrowList.studio.split("//"):
            equipList = equipList.strip()
            if(equipList == Ename):
                if(borrowList.fromDate == borrowList.toDate):
                    for j in range(borrowList.fromDateTime, borrowList.toDateTime+2):
                        tomorrowTime[j] -= 1
    
    return todayTime, tomorrowTime


def findEquipTime(Ename, Eto, Ecount):
    todayTime = [Ecount for i in range(24)]
    tomorrowTime = [Ecount for i in range(24)]
    # 오늘 현황 (오늘 반납할 사람 + 빌리는 사람)
    todayReturn = EquipmentBorrow.objects.filter(
        Q(fromDate=str(int(Eto)-1)), Q(toDate=Eto),(Q(borrowState=0) | Q(borrowState=1)| Q(borrowState=2)))
    todayBorrow = EquipmentBorrow.objects.filter(Q(fromDate=Eto),(Q(borrowState=0) | Q(borrowState=1)| Q(borrowState=2)))
    for borrowList in todayReturn:
        for equipList in borrowList.equipment.replace("[", "").replace("]", "").replace("'", "").split(","):
            [equip, count] = equipList.split(":")
            equip = equip.strip()
            count = count.strip()
            if(equip == Ename):
                for j in range(borrowList.toDateTime+1):
                    todayTime[j] -= int(count)
    for borrowList in todayBorrow:
        for equipList in borrowList.equipment.replace("[", "").replace("]", "").replace("'", "").split(","):
            
            [equip, count] = equipList.split(":")
            equip = equip.strip()
            count = count.strip()
            if(equip == Ename):
                if(int(borrowList.fromDate) < int(borrowList.toDate)):
                    for j in range(borrowList.toDateTime+1):
                        tomorrowTime[j] -= int(count)
                    for j in range(borrowList.fromDateTime, 24, 1):
                        todayTime[j] -= int(count)
                else:
                    for j in range(borrowList.fromDateTime, borrowList.toDateTime+2):
                        todayTime[j] -= int(count)
    # 내일 현황 (내일기준 반납할 사람 + 빌리는 사람)
    tomorrowBorrow = EquipmentBorrow.objects.filter(Q(fromDate=str(int(Eto)+1)),(Q(borrowState=0) | Q(borrowState=1)| Q(borrowState=2)))
    for borrowList in tomorrowBorrow:
        for equipList in borrowList.equipment.replace("[", "").replace("]", "").replace("'", "").split(","):
            [equip, count] = equipList.split(":")
            equip = equip.strip()
            count = count.strip()
            if(equip == Ename):
                if(borrowList.fromDate == borrowList.toDate):
                    for j in range(borrowList.fromDateTime, borrowList.toDateTime+1):
                        tomorrowTime[j] -= int(count)
    return todayTime[9:17], tomorrowTime[9:17]
