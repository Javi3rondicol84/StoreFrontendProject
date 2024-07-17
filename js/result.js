"use strict";


window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search'); //usar search para buscar un producto con like de esto

    document.querySelector("#test").innerHTML = search;




}