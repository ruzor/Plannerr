const regForm = _(".signup-form");
const loginForm = _(".signin-form");
const userEmail = _("#newUserEmail");
const email = localStorage.getItem("email") || "";

// For signUp
if (regForm) {
    userEmail.setAttribute("value", email);
    regForm.addEventListener("submit", e => {
        e.preventDefault();
        
        let registerUrl = "/api/register";
        registerUrl = `${api_link}${registerUrl}`;
        let formData = new FormData(regForm);
        const passwordValue = formData.get("password");

        formData.set("password_confirmation", passwordValue);

        axios.post(registerUrl, formData)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err.response);
            handleError(err.response);
        })
    })
}

// For signIn
if (loginForm) {
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        
        let loginUrl = "/api/login";
        loginUrl = `${api_link}${loginUrl}`;
        let formData = new FormData(loginForm);

        axios.post(loginUrl, formData)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err.response);
            handleError(err.response);
        })
    })
}
