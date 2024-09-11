"use strict";

const apiSearchRoute = "http://localhost:8080/products/search?keyword=";
const apiCategoryRoute = "http://localhost:8080/products/category?category=";

window.onload = function() {
    main();

    if(window.location.search.includes("search")) {
        const params = new URLSearchParams(window.location.search);
        const search = params.get('search'); //usar search para buscar un producto con like de esto
    
        let resultsCardsDiv = document.querySelector(".resultsCards");
    
        async function showResults() {
            resultsCardsDiv.innerHTML = ""; 
    
            try {
                
                let response = await fetch(apiSearchRoute+search);
                
                if(!response.ok) {
                    console.log("fallido, sin productos");
                }
    
                let products = await response.json();
    
                products.forEach(product => {
                    
                    resultsCardsDiv.innerHTML += 
                    `
                        <div class="resultCard">
                            <img src="../files/card-images/add-product.png">
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
    else if(window.location.search.includes("category")) {
        const params = new URLSearchParams(window.location.search);
        const categoryChoosed = params.get('category'); 
    
        let resultsCardsDiv = document.querySelector(".resultsCards");
    
        async function showResults() {
            resultsCardsDiv.innerHTML = ""; 
    
            try {
                
                let response = await fetch(apiCategoryRoute+categoryChoosed);
                
                if(!response.ok) {
                    console.log("fallido, sin productos");
                }
    
                let products = await response.json();
    
                products.forEach(product => {
                    
                    resultsCardsDiv.innerHTML += 
                    `
                        <div class="resultCard">
                            <img src="../files/card-images/add-product.png">
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
    
    
  
}