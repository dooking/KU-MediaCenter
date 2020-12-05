function init() {
  const studioLists = document.querySelectorAll(".equipmentList");
  for (let studioList of studioLists) {
    const studios = studioList.value.split("//");
    studios.pop();
    for (let studio of studios) {
      if (studio.slice(-2) == "PC") {
        studio = "편집실 " + studio;
      }
      let item = document.createElement("p");
      item.innerText = studio;
      studioList.parentNode.appendChild(item);
    }
  }
}

init();
