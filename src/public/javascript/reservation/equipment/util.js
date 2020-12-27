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