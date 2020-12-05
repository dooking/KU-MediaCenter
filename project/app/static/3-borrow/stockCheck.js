// 장비가 남아있는지 확인
let equipmentName= document.getElementsByClassName("equipmentName")
let equipmentCount= document.getElementsByClassName("equipmentCount")
let equipmentCount2= document.getElementsByClassName("equipmentCount2")
let checkCount = new Map()

for(let i=0; i<equipmentName.length; i++){
    let todayCount = equipmentCount[i].value.replace(/\[|\]/gi,"").split(",")
    let tomorrowCount = equipmentCount2[i].value.replace(/\[|\]/gi,"").split(",")
    checkCount.set(equipmentName[i].value,todayCount.concat(tomorrowCount))
}