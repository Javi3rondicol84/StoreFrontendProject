"use strict";

const apiSearchRoute = "http://localhost:8080/products/search?keyword=";
const apiCategoryRoute = "http://localhost:8080/products/category?category=";

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('search');

    let resultsCardsDiv = document.querySelector(".resultsCards");

    showResults();

    async function showResults() {
        resultsCardsDiv.innerHTML = "";

        try {

            let response = await fetch(apiSearchRoute+searchValue);

            if(!response.ok) {
                console.log("fallido, sin productos");
            }

            let products = await response.json();

            products.forEach(product => {

                resultsCardsDiv.innerHTML +=
                    `
                        <div class="resultCard">
                            <img src="../files/add-product.png">
                            <div class="resultCardInfo">
                                <h2>${product.productName}</h2>
                                <p>${product.price}</p>
                            </div>
                        </div>
                    
                    `

            });


        }
        catch(e) {
            console.log(e);
        }

    }
}