"use strict";
const url = "http://localhost:8080/auth/register";

let formRegister = document.querySelector("#formRegister");
let registermessage = document.querySelector("#register-message");

if (formRegister) {
    formRegister.addEventListener("submit", register);
}

async function register(e) {
    e.preventDefault();
    registermessage.innerHTML = "";
    let formData = new FormData(formRegister);

    let username = formData.get('username');
    let pass = formData.get('pass');
    let email = formData.get('email');

    let data = {
        "username": username,
        "password": pass,
        "email": email
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        const token = responseData.token;

        localStorage.setItem('token', token);

        if(!response.ok) {
            registermessage.innerHTML = "Los datos estan incompletos.";
        }
        else {
            registermessage.innerHTML = "El usuario se registró correctamente.";

            setTimeout(() => {
                window.location.href = "../index.html"
            }, 800);

        }

    }
    catch(error) {
        console.log(error);
    }




}