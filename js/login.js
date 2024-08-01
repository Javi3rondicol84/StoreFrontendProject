"use strict";
const url = "http://localhost:8080/auth/login";

let formLogin = document.querySelector("#formLogin");
let loginmessage = document.querySelector("#login-message");

if (formLogin) {
    formLogin.addEventListener("submit", logging);
}

async function logging(e) {
    e.preventDefault();
    loginmessage.innerHTML = "";
    let formData = new FormData(formLogin);

    let username = formData.get('username');
    let pass = formData.get('pass');

    let data = {
        "username": username,
        "password": pass
    }
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const token = await response.json();

        if(!response.ok) {
            loginmessage.innerHTML = "El username o la contraseña son incorrectos";
        }
        else {
            loginmessage.innerHTML = "El usuario se ingreso correctamente, el token es: "+token.token;
            console.log(token.token);

         //   setTimeout(() => {
           //     window.location.href = "../index.html"
            //}, 1250);
            
        }

    }
    catch(error) {
        console.log(error);
    }


  
       
}