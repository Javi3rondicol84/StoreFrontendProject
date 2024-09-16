"use strict";

const token = localStorage.getItem('token');

async function main() {
    let isLogged = document.querySelector("#logged");
    let cart = document.querySelector(".cart");
    let createAccount = document.querySelector(".createAccount");

    if(token) {
        const decodedToken = jwt_decode(token);
        const currentTime = Math.floor(Date.now() / 1000); 
        console.log(token);
        if (decodedToken.exp > currentTime) {
            // Token is valid
            createAccount.classList.add("hidden");
            cart.classList.remove("hidden");
            isLogged.innerHTML = "Cerrar Sesión ["+decodedToken.sub+":"+decodedToken.authorities+"]";
        } else {
            // Token has expired
            localStorage.removeItem('token');
            createAccount.classList.remove("hidden");
            cart.classList.add("hidden");
            isLogged.innerHTML = "Iniciar Sesion";
        }
    } else {
        // No token present
        createAccount.classList.remove("hidden");
        cart.classList.add("hidden");
        isLogged.innerHTML = "Iniciar Sesion";
    }

    //delete token - close session
    if(isLogged.innerHTML != "Iniciar Sesion") {
        isLogged.addEventListener("click", function() {

            localStorage.removeItem('token');
            isLogged.href = "";
        });
    }
    

}

main();