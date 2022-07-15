const confirmationText = document.querySelector(".confirmation");

function checkConfirmation() {
if (totalCount == 6500) {
    confirmationText.classList.add("confirmation__yes");
} else {
    confirmationText.classList.remove("confirmation__yes");
}
}