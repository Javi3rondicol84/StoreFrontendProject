"use strict";

document.querySelector("#searchButton").addEventListener("click", searchResult);


async function searchResult(e) {
    
    e.preventDefault();
    let searchValue = document.querySelector("#searchValue").value;

     /*

    localStorage.setItem('search', searchValue);
    window.location.href = `pages/result.html`;*/

    if (window.location.pathname.includes('result.html')) {
        // Si ya estamos en result.html, redireccionamos sin duplicar 'pages/'
        window.location.href = `result.html?search=${encodeURIComponent(searchValue)}`;
    } else {
        // Redireccionamos a result.html desde cualquier otra página
        window.location.href = `pages/result.html?search=${encodeURIComponent(searchValue)}`;
    }
    
}