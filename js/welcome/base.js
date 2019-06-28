const api_link = "https://goalsetterapi.herokuapp.com";

function assignLocation(str) {
    location.assign(str);
}

function _(str) {
    return document.querySelector(str);
}

function all(str) {
    return document.querySelectorAll(str);
}

function formDataToObject(formData) {
    return new Object(Array.from(formData.entries()).reduce((old, pair) => ({
        ...old, [pair[0]]: pair[1]
    }), {}))
}

// toggle password reveal (&#xf06e;) ==> illuminati 👁
// x - string id of clicked element, y - string id of input[type="password"] 
function showPwd(x, y) {
    if (_(x).classList.contains('active')) {
        _(x).innerHTML = '&#xf06e;';
        _(y).type = 'password';
        _(x).classList.remove('active')
    } else {
        _(x).innerHTML = '&#xf070;';
        _(y).type = 'text';
        _(x).classList.add('active');
    }
}

// 
function handleError(error) {
    function genericErrorFunction(data) {
        const newText = error.data.data.message;
        const errorElem = _(`[data-id='${data}']`);
        const id = errorElem.previousElementSibling.id;
        const inputElem = _(`#${id} input`) || _(`#${id}`);

        [errorElem.innerText, formerText] = [newText, errorElem.innerText];
        errorElem.classList.add("invalid");
        inputElem.classList.add("invalid");
        
        inputElem.addEventListener("input", () => {
            errorElem.innerText = formerText;
            errorElem.classList.remove("invalid");
            inputElem.classList.remove("invalid");
        })
    }
    if (error.status === 400) {
        genericErrorFunction("bad-request");
    }
    if (error.status === 401) {
        genericErrorFunction("password");
    }
    if (error.status === 404) {
        genericErrorFunction("email");
    }
    if (error.status === 422) {
        const errors = error.data;
        const badEggs = Object.keys(errors);
        
        function throwErrors(badEgg) {
            let errorElem = _(`[data-id='${badEgg}']`);
            newText = errors[badEgg][0];
            [errorElem.innerText, formerText] = [newText, errorElem.innerText];
            errorElem.classList.add("invalid");

            all(".change > input").forEach(elem => {
                elem.addEventListener("input", () => {
                    errorElem.innerText = formerText;
                    errorElem.classList.remove("invalid");
                })
            })
        }
        badEggs.forEach(badEgg => {
            throwErrors(badEgg);
        });
    }
}

// helper function for css to animate label on input field
all(".con-input input").forEach((elem) => {
    elem.addEventListener("blur", (e) => {
        e.preventDefault();
        let parent = elem.parentNode;
        elem.value? parent.classList.add("valid"):parent.classList.remove("valid");
    })
})