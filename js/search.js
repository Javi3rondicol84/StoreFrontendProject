"use strict";

document.querySelector("#searchButton").addEventListener("click", searchResult);


async function searchResult(e) {
    e.preventDefault();
  
    let searchValue = document.querySelector("#searchValue").value;
    localStorage.setItem('search', searchValue);
    window.location.href = `pages/result.html`;


    
}