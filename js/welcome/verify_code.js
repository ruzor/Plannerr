const formConfirmCode = _(".form-confirm-code");

if (formConfirmCode) {
    formConfirmCode.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(formConfirmCode);
        const code = formData.get("verify_code");
        localStorage.setItem("code", code);
        setTimeout(assignLocation("./newpassword.html"), 10000);
    })    
}