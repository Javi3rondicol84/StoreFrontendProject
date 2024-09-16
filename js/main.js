"use strict";

const token = localStorage.getItem('token');

//anchor login - register in nav
let loginRegisterDiv = document.querySelector(".nav-first-second");

main();

async function main() {
//if user is logged
    if(token) {

        loginRegisterDiv.innerHTML = "";
        const decodedToken = parseJwt(token);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(token);
        if (decodedToken.exp > currentTime) {
            loginRegisterDiv.innerHTML =  `
              <ul>
                    <li class="closeSession">Cerrar sesion [${decodedToken.sub}:${decodedToken.authorities}]</li>
              </ul> `;

            let closeSessionLi = document.querySelector(".closeSession");
            closeSessionLi.addEventListener("click", () => {
                localStorage.removeItem('token');
                location.reload();
            });
        }
        else {
            // Token has expired
            localStorage.removeItem('token');
            loginRegisterDiv.innerHTML = `
              <ul>
                    <li><a href="pages/login.html">Iniciar sesion</a></li>
                    <li><a href="pages/register.html">Registrarse</a></li>
              </ul> `;
        }
    }
    else {

        loginRegisterDiv.innerHTML = ` 
              <ul>
                    <li><a href="pages/login.html">Iniciar sesion</a></li>
                    <li><a href="pages/register.html">Registrarse</a></li>
              </ul>
                    `;
    }
}

// decode JWT Token
function parseJwt (token) {
    try {
        // Dividimos el token por puntos (header.payload.signature)
        const base64Url = token.split('.')[1];
        // Decodificamos de Base64 a string
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        // Retornamos el objeto JSON
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Token no válido o malformado", e);
        return null;
    }
}