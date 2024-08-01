"use strict";

const token = localStorage.getItem('token');

async function main() {
    let isLogged = document.querySelector("#logged");
    let cart = document.querySelector(".cart");
    let createAccount = document.querySelector(".createAccount");
    const decodedToken = jwt_decode(token);

    if(token) {
        createAccount.classList.add("hidden");
        cart.classList.remove("hidden");
        isLogged.innerHTML = "Cerrar Sesión ["+decodedToken.sub+":"+decodedToken.authorities+"]";
    }
    else {
        createAccount.classList.remove("hidden");
        cart.classList.add("hidden");
        isLogged.innerHTML = "Iniciar Sesion";
    }

}

main();