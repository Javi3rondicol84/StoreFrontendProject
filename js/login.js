"use strict";
const url = "http://localhost:8080/users/";

let formLogin = document.querySelector("#formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", logging);
}

async function logging(e) {
    e.preventDefault();
    let formData = new FormData(formLogin);
    let loginmessage = document.querySelector("#login-message");

    let username = formData.get('username');
    let email = formData.get('email');
    let pass1 = formData.get('pass1');
    let pass2 = formData.get('pass2');

    loginmessage.innerHTML = "";


    try {
        let response = await fetch(url);

        if (response.ok) {
            let users = await response.json();
            console.log(users);
            console.log(username);
            console.log(email);
            console.log(pass1);

            let encriptedpass;
            let found = users.some(user =>
                user.userName == username,
                
            );

            users.forEach(element => {
               console.log(element.userName); 
            });

            if (pass1 !== pass2) {
                loginmessage.innerHTML = "Las contraseñas no coinciden.";
                return;
            }

            if (found) {

                if(bcrypt.compare(pass1, userfound.password)) {
                    loginmessage.innerHTML = "Te has ingresado correctamente.";
                    setTimeout(() => {
                        window.location.href = "../index.html";
                    }, 2000);
                }

            } else {
                loginmessage.innerHTML = "El usuario no existe.";
            }
        } else {
            loginmessage.innerHTML = "Error al conectarse al servidor.";
        }
    } catch (error) {
        console.log(error);
        loginmessage.innerHTML = "Error de red.";
    }
}