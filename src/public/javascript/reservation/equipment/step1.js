const $reservationList = document.querySelector(".reservation_list")

// Set IntroPage initialize 
if(sessionStorage.getItem('intro_checked')){
  sessionStorage.removeItem('intro_checked')
}

// CheckBox Check (Rendering)
const $checkBoxesEl = document.querySelectorAll("input[type=checkbox], input[type=radio]")
$checkBoxesEl.forEach(checkBox=>{
  const { name } = checkBox.dataset
  if(sessionStorage.getItem(name)){
    checkBox.checked = true
    addList(name, sessionStorage.getItem(name))
    if(checkBox.dataset.category === '기타 부속'){
      const $selectCountEl = findSelectEl(checkBox, 'countSelect')
      $selectCountEl.classList.remove('none')
      $selectCountEl[sessionStorage.getItem(name)].selected = true
    }
  }
})

// Equipmnet Stock
let $equipmentNameEl = document.getElementsByClassName("equipmentName")
let $currentStockEl = document.getElementsByClassName("currentStock")
let $nextStockEl = document.getElementsByClassName("nextStock")
let equipmentStock = new Map()

for(let i=0; i<$equipmentNameEl.length; i++){
    let todayCount = $currentStockEl[i].value.replace(/\[|\]/gi,"").split(",")
    let tomorrowCount = $nextStockEl[i].value.replace(/\[|\]/gi,"").split(",")
    equipmentStock.set($equipmentNameEl[i].value,todayCount.concat(tomorrowCount))
}

// time block
for (let index = 0; index < 18; index++) {
  let blockCount = document.getElementsByClassName(String(index));
  for (let i = 0; i < blockCount.length; i++) {
    for (let j = 0; j < blockCount[i].id; j++) {
      const newDivEl = document.createElement("div");
      newDivEl.setAttribute("class", "time-block");
      blockCount[i].appendChild(newDivEl);
    }
  }
}