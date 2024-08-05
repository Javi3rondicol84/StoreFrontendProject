"use strict";

const api = "http://localhost:8080/products/"

//all carousels
let carouselsdiv = document.querySelector("#carousels");

if(carouselsdiv) {
    setAllCarousels();
}


async function setAllCarousels() {
    let categories = [];

    carouselsdiv.innerHTML += "";
        try {
            //let response = await fetch(api+"limit?limitValue=5");
            let response = await fetch(api+"categories/");

            if(!response.ok) {
                console.log("no se pudo traer la respuesta");
            }

            let allData = await response.json();

            allData.forEach(category => {

                categories.push(category);

               carouselsdiv.innerHTML += 
               `
               <div class="carousel">
                   <div class="sellersTitle">
                       <h2>Los 5 Más vendidos en ${category}</h2>
                   </div>
                   <div class="cards" id="${category}">
                    <button class="left-button card-button"><img src="files/play.png"></button>
                    <button class="right-button card-button"><img src="files/play.png"></button>
                   </div>
               </div>`;

            });
        }
        catch(e) {
            console.log("error de red");
        }

        showCardsByCategory(categories);

}

async function showCardsByCategory(categories) {
  
    for(let i = 0; i < categories.length; i++) {
        console.log(categories[i]);

        let cardsDiv = document.querySelector("#"+categories[i]);

        try {
            let response = await fetch(api+`filterByCategoryLimit?category=${categories[i]}&limit=10`);
    
            let products = await response.json();
    
            products.forEach(product => {
         
                cardsDiv.innerHTML += `
    
                    <div class="card">
                        <div class="imgCard">
                            <img src="files/card-images/shoe.jpg">
                        </div>
                        <div class="titleCard">
                            <p>${product.productName}</p>
                        </div>
                        <div class="priceCard">
                            <p>$${product.price}</p>
                        </div>
                    </div>
    
            
                `
            });

        }
        catch(e) {
            console.log(e+"error");
        }


    }

    let buttonsCard = document.querySelectorAll(".card-button");

    buttonsCard.forEach(buttonCard => {
        
        buttonCard.addEventListener("click", function() {
            
            console.log(buttonCard.parentElement);

        });

    });

}


let dropdownMenuLi = document.querySelector(".dropdownLi");

let dropdownMenu = document.querySelector(".categoriesMenuDropdown");

dropdownMenuLi.addEventListener("mouseenter", function() {

    dropdownMenu.classList.toggle("hidden");

    let ulCategories = document.querySelector(".categoriesLi");

    if(ulCategories.querySelectorAll('li').length === 0) {
        addCategoriesLi(ulCategories);
    }
});

dropdownMenu.addEventListener("mouseleave", function() {

    dropdownMenu.classList.toggle("hidden");
});

async function addCategoriesLi(ulCategories) {
    
    try {
        let response = await fetch(api+"categories/");

        if(!response.ok) {
            console.log("error bad request");
        }
        
        let categories = await response.json();

        categories.forEach(category => {
            
            if (window.location.pathname.includes('result.html')) {
                
                ulCategories.innerHTML += 
                `
                    <a href="result.html?category=${category}"><li>${category}</li></a>
                
                `
            } else {
               
                ulCategories.innerHTML += 
                `
                    <a href="pages/result.html?category=${category}"><li>${category}</li></a>
                
                `

            }
    


        });
    }
    catch(e) {
        console.log(e);
    }


    


}
