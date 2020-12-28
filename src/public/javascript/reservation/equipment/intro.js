const $check = document.querySelector("#check")
const $borrow = document.querySelector(".borrow")

window.onload = function (event){
    if(sessionStorage.getItem('intro_checked')){
        $check.checked = true
        $borrow.classList.add("block")
    }
    else{
        $borrow.classList.add("block")
        $check.checked = false
        $borrow.classList.remove("block")
    }
}

$check.addEventListener("click", ({ target }) => {
    if (target.checked) {
        $borrow.classList.add("block")
        sessionStorage.setItem('intro_checked', true)
    }
    else {
        $borrow.classList.remove("block")
        sessionStorage.removeItem('intro_checked')
    }
})