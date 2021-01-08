const $reservationList = document.querySelector(".reservation_list")

// Set IntroPage initialize 
if(sessionStorage.getItem('intro_checked')){
  sessionStorage.removeItem('intro_checked')
}

// CheckBox Check (Rendering)
const $checkBoxes = document.querySelectorAll("input[type=checkbox], input[type=radio]")
$checkBoxes.forEach(checkBox=>{
  const { name } = checkBox.dataset
  if(sessionStorage.getItem(name)){
    checkBox.checked = true
    addList(name, sessionStorage.getItem(name))
    if(checkBox.dataset.category === '기타 부속'){
      const $selectCount = findSelectEl(checkBox, 'countSelect')
      $selectCount.classList.remove('none')
      $selectCount[sessionStorage.getItem(name)].selected = true
    }
  }
})

// Equipmnet Stock
let $equipmentName = document.getElementsByClassName("equipmentName")
let $currentStock = document.getElementsByClassName("currentStock")
let $nextStock = document.getElementsByClassName("nextStock")
let equipmentStock = new Map()

for(let i=0; i<$equipmentName.length; i++){
    let todayCount = $currentStock[i].value.replace(/\[|\]/gi,"").split(",")
    let tomorrowCount = $nextStock[i].value.replace(/\[|\]/gi,"").split(",")
    equipmentStock.set($equipmentName[i].value,todayCount.concat(tomorrowCount))
}
