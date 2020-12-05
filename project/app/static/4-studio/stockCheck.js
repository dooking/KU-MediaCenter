// 장비가 남아있는지 확인
let studioName= document.getElementsByClassName("studioName")
let studioCount= document.getElementsByClassName("studioCount")
let studioCount2= document.getElementsByClassName("studioCount2")
let checkCount = new Map()

for(let i=0; i<studioName.length; i++){
    let todayCount = studioCount[i].value.replace(/\[|\]/gi,"").split(",")
    let tomorrowCount = studioCount2[i].value.replace(/\[|\]/gi,"").split(",")
    checkCount.set(studioName[i].value,todayCount.concat(tomorrowCount))
}