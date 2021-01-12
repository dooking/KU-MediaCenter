const $tr = document.querySelector(".tbody")

$tr.addEventListener('click',(event)=>{
    const { id: equipmentId }  = event.target.dataset
    return window.location.href=`/admin/manage/equipment/detail/${equipmentId}`
});

// 모든 체크박스를 클릭, 해제하는 함수
function allCheck(event){
    const $checkButtons = document.querySelectorAll('.check')
    for (let $checkButton of $checkButtons){
        $checkButton.checked = event.checked ? true : false; 
    }
}

// 체크박스 클릭 시, 상위 이벤트로 전달하지 않음
function clickCheck(event){
    event.stopImmediatePropagation()
}

// 체크된 장비를 삭제
function deleteEquipment(){
    const deleteList = []
    const $checkButtons = document.querySelectorAll('.check')
    for (let $checkButton of $checkButtons){
        if($checkButton.checked){
            deleteList.push(parseInt($checkButton.value))
        }
    }

    return window.location.href=`/admin/manage/equipment/delete/${deleteList}`
}