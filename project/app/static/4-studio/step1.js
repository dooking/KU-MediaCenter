let tempList = new Map()
let prevValue = ""

function hide(event) {
    const hide = event.parentNode.nextElementSibling;
    //hide.classList.toggle("mystyle");
    if(hide.classList.contains("mystyle")){
        hide.classList.remove("mystyle")
        event.textContent = "▲"
    }
    else{
        hide.classList.add("mystyle")
        event.textContent = "▼"
    }
}
function radioHandler(cb){
    const borrowList = document.querySelectorAll("li")
    const borrowClass = document.querySelector(".borrow_list")
    const addItem = document.createElement('li')
    let check = 0
    let index = 0
    for(let i=0; i<borrowList.length; i++){
        if(borrowList[i].className === "edit"){
            if(cb.value === borrowList[i].textContent.slice(-5)){
                check = 2
            }
            else{
                check = 1
            }
            index = i
            break;
        }
    }
    if(check === 1){
        borrowList[index].textContent = "편집실 "+cb.value
        tempList.set(cb.id,cb.value)
    }
    else if(check === 2){
        borrowClass.removeChild(borrowList[index])
        cb.checked = false
        tempList.delete(cb.id)
    }
    else{
        addItem.setAttribute("class","edit")
        addItem.textContent = "편집실 "+cb.value
        borrowClass.appendChild(addItem)
        tempList.set(cb.id,cb.value)
    }
}
function checkHandler(cb){
    const borrowList = document.querySelectorAll("li")
    const borrowClass = document.querySelector(".borrow_list")
    const addItem = document.createElement('li')
    let check = false
    let index = 0
    for(let i=0; i<borrowList.length; i++){
        if(borrowList[i].className === `${cb.id}`){
            check = true
            index = i
            break;
        }
    }
    if(check){
        borrowClass.removeChild(borrowList[index])
        tempList.delete(cb.value)
    }
    else{
        addItem.setAttribute("class",`${cb.id}`)
        addItem.textContent = cb.value
        borrowClass.appendChild(addItem)
        tempList.set(cb.value,"1")
    }
}

//time block
for (let index=0; index<48; index++){
    let blockCount = document.getElementsByClassName(String(index))
    for (let i=0; i<blockCount.length; i++)
    {
        // 스튜디오 존재
        if(blockCount[i].id != "0"){
            const newDiv = document.createElement('div')
            newDiv.setAttribute("class","time-block")
            blockCount[i].appendChild(newDiv);
        }
        // 스튜디오 이미 예약됨
        else{
            const newDiv = document.createElement('div')
            newDiv.setAttribute("class","time-block-booked")
            blockCount[i].appendChild(newDiv);
        }
    }
}