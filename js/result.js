"use strict";


window.onload = function() {
    const search = localStorage.getItem('search');

    document.querySelector("#test").innerHTML = search;

    



    localStorage.removeItem('search');
}