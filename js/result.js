"use strict";

const api = "http://localhost:8080/products/search?keyword="

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search'); //usar search para buscar un producto con like de esto

    let resultsCardsDiv = document.querySelector(".resultsCards");

    async function showResults() {
        resultsCardsDiv.innerHTML = ""; 

        try {
            
            let response = await fetch(api+search);
            
            if(!response.ok) {
                console.log("fallido, sin productos");
            }

            let products = await response.json();

            products.forEach(product => {
                
                resultsCardsDiv.innerHTML += 
                `
                    <div class="resultCard">
                        <img src="../files/card-images/shoe.jpg">
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
    
    showResults();
}