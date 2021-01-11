function allCheck(event){
    const $checkButtons = document.querySelectorAll('.check')
    for (let $checkButton of $checkButtons){
        $checkButton.checked = event.checked ? true : false; 
    }
}

function clickCheck(event){
    event.stopImmediatePropagation()
}