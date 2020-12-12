const check = document.querySelector("#check")
const borrow = document.querySelector(".borrow")
check.addEventListener("click", ({ target }) => {
    if (target.checked) {
        console.log(target.checked)
        borrow.classList.add("block")
    }
    else {
        borrow.classList.remove("block")
    }
})