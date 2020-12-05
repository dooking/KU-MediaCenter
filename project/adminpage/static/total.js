function init() {
  const equipmentLists = document.querySelectorAll(".equipmentList");
  for (let equipmentList of equipmentLists) {
    if (equipmentList.value.includes("@@")) {
      const newlistsDevice = equipmentList.value.split("@@");
      for (let newlistDevice of newlistsDevice) {
        let item = document.createElement("p");
        const itemAttr = newlistDevice.split("^").join(" ");
        item.innerText = itemAttr;
        equipmentList.parentNode.appendChild(item);
      }
    } else {
      const newlistsDevice = equipmentList.value
        .slice(1, -1)
        .replace(/'/g, "")
        .replace(/ /g, "")
        .split(",");
      for (let newlistDevice of newlistsDevice) {
        let item = document.createElement("p");
        const itemAttr = newlistDevice.split(":");
        item.innerText = itemAttr[0] + "    " + itemAttr[1] + "개";
        equipmentList.parentNode.appendChild(item);
      }
    }
  }
}

init();
