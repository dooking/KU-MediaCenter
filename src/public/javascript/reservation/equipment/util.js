// camera는 최대 1개까지 선택 가능
function checkCamera () {
  for (const [name, count] of Object.entries(sessionStorage)) {
    const removeList = document.getElementsByClassName(`${name}`)[0]
    if(name.includes('DSLR') || name.includes('Camcorder')){
      sessionStorage.removeItem(name)
      removeList.remove()
      return;
    }
  }
}

// Etc Event
function selectEl(event, selector){
  const $cam_check = event.closest('.cam_check')
  const $selectCountEl = $cam_check.getElementsByClassName(`${selector}`)[0]
  return $selectCountEl;
}

// Add List
function addList(name, count){
  sessionStorage.setItem(name, count)
  const alreadyEl = document.getElementsByClassName(`${name}`)[0]
  if(alreadyEl){
    alreadyEl.textContent = name + ' ' + sessionStorage.getItem(name) + '대'
  }
  else{
    const listEl = document.createElement('li')
    listEl.textContent = name + ' ' + sessionStorage.getItem(name) + '대'
    listEl.setAttribute("class", `${name}`);
    $reservationList.appendChild(listEl)
  }
  return;
}

// remove List
function removeList(name){
  sessionStorage.removeItem(name)

  const listEl = document.getElementsByClassName(`${name}`)[0]
  listEl.remove()
  return;
}

// Dropdown
function hide(event) {
  const hide = event.nextElementSibling;
  if (hide.classList.contains("mystyle")) {
    hide.classList.remove("mystyle");
    event.childNodes[3].innerText = "▲";
  } else {
    hide.classList.add("mystyle");
    event.childNodes[3].innerText = "▼";
  }
}