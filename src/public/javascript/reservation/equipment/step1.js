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
      const $selectCountEl = selectEl(checkBox, 'countSelect')
      $selectCountEl.classList.remove('none')
      $selectCountEl[sessionStorage.getItem(name)].selected = true
    }
  }
})

// Equipmnet Stock
let equipmentName= document.getElementsByClassName("equipmentName")
let equipmentCount= document.getElementsByClassName("equipmentCount")
let equipmentCount2= document.getElementsByClassName("equipmentCount2")
let equipmentStock = new Map()

for(let i=0; i<equipmentName.length; i++){
    let todayCount = equipmentCount[i].value.replace(/\[|\]/gi,"").split(",")
    let tomorrowCount = equipmentCount2[i].value.replace(/\[|\]/gi,"").split(",")
    equipmentStock.set(equipmentName[i].value,todayCount.concat(tomorrowCount))
}

// time block
for (let index = 0; index < 18; index++) {
  let blockCount = document.getElementsByClassName(String(index));
  for (let i = 0; i < blockCount.length; i++) {
    for (let j = 0; j < blockCount[i].id; j++) {
      const newDiv = document.createElement("div");
      newDiv.setAttribute("class", "time-block");
      blockCount[i].appendChild(newDiv);
    }
  }
}
