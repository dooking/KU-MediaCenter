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


//time block
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
