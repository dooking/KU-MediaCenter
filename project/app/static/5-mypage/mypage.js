let EModalID = 0
let SModalID = 0

const openEquipModal = function (event) {
    try {        
        EModalID = 0
        const equipPK = event.id
        const modal = document.getElementById(`Emodal_${equipPK}`)
        const borrowState = modal.querySelector(`#borrowState_${equipPK}`).value

        if (borrowState != 0) {
            throw new Error("대여 중에는 예약 취소가 불가능합니다.")
        }
        EModalID = equipPK
        modal.classList.toggle('modal_close')
    } catch (e) {
        alert(e.message)
    }
}

const openStudioModal = function (event) {
    try {
        SModalID = 0
        const studioPK = event.id
        const modal = document.getElementById(`Smodal_${studioPK}`)
        const studioState = modal.querySelector(`#studioState_${studioPK}`).value

        if (studioState != 0) {
            throw new Error("대여 중에는 예약 취소가 불가능합니다.")
        }
        SModalID = studioPK
        modal.classList.toggle('modal_close')
    } catch (e) {
        alert(e.message)
    }
}

const cancelBtn = (event)=>{
    try{
        const ID = event.id
        const modal = document.querySelector(`#Emodal_${ID}`)
        if(ID === undefined || modal === undefined){
            throw new Error("접근이 올바르지 않습니다")
        }
        modal.classList.toggle('modal_close')
    }
    catch(err){
        alert(err.message)
    }
}

const cancelBtn2 = (event)=>{
    try{
        const ID = event.id
        const modal = document.querySelector(`#Smodal_${ID}`)
        if(ID === undefined || modal === undefined){
            throw new Error("접근이 올바르지 않습니다")
        }
        modal.classList.toggle('modal_close')
    }
    catch(err){
        alert(err.message)
    }
}

window.onclick = function(event) {
    const Emodal = document.querySelector(`#Emodal_${EModalID}`)
    const Smodal = document.querySelector(`#Smodal_${SModalID}`)
    if(event.target == Emodal){
        Emodal.classList.toggle('modal_close')
    }
    else if(event.target == Smodal){
        Smodal.classList.toggle('modal_close')
    }
    
}