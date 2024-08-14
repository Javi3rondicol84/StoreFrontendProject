"use strict";

const api = "http://localhost:8080/products/"

//all carousels
let carouselsdiv = document.querySelector("#carousels");

if(carouselsdiv) {
    setAllCarousels();
}

async function setAllCarousels() {
    let categories = [];
    carouselsdiv.innerHTML = "";
    try {
        let response = await fetch(api + "categories/");
        if (!response.ok) {
            console.log("No se pudo traer la respuesta");
        }
        let allData = await response.json();
        allData.forEach(category => {
            categories.push(category);
            carouselsdiv.innerHTML += `
               <div class="carousel">
                   <div class="sellersTitle">
                       <h2>Los 5 Más vendidos en ${category}</h2>
                   </div>
                   <div class="cards" id="${category}">
                    <button class="left-button" data-category="${category}"><img src="files/play.png"></button>
                    <button class="right-button" data-category="${category}"><img src="files/play.png"></button>
                   </div>
               </div>`;
        });

    } catch (e) {
        console.log("Error de red");
    }

    showCardsByCategory(categories);

}


async function showCardsByCategory(categories) {
    let i = 0;
    for (i = 0; i < categories.length; i++) {
        let page = 0;
        let cardsDiv = document.querySelector(`#${categories[i]}`);
        await loadCards(categories[i], page);

        let leftButton = cardsDiv.querySelector(".left-button");
        let rightButton = cardsDiv.querySelector(".right-button");

        leftButton.addEventListener("click", async (event) => {
            const category = event.currentTarget.getAttribute('data-category');
            if (page > 0) {
                page--;
                await loadCards(category, page, 'left');
            }
        });

        rightButton.addEventListener("click", async (event) => {
            const category = event.currentTarget.getAttribute('data-category');
            page++;
            const hasMore = await loadCards(category, page, 'right');
        
            if(!hasMore) {
                page--;
            }
        });

    }

}

async function loadCards(category, page, direction) {
    let cardsDiv = document.querySelector(`#${category}`);
    let cardsContent = cardsDiv.querySelector(".cards-content");

    if (!cardsContent) {
        cardsContent = document.createElement("div");
        cardsContent.className = "cards-content";
        cardsDiv.appendChild(cardsContent);
    }
    try {

       let response = await fetch(api+`filterByCategoryPagination?category=${category}&limit=5&offset=${page}`);

       if (!response.ok) {
        console.log("Error al cargar los productos");
        return false;
        }

        let products = await response.json();

        if (products.length === 0) {
            return false;
        }

        if (direction === 'left') {
            cardsContent.style.transform = 'translateX(100%)';
        } else if (direction === 'right') {
            cardsContent.style.transform = 'translateX(-100%)';
        }
        
        setTimeout(() => {
            cardsContent.innerHTML = "";
            if(token) {
                products.forEach(product => {
                    cardsContent.innerHTML += `
                        <div class="card" id="${product.productId}">
                            <div class="imgCard">
                                <img src="files/card-images/add-product.png">
                            </div>
                            <div class="titleCard">
                                <p>${product.productName}</p>
                            </div>
                            <div class="priceCard">
                                <p>$${product.price}</p>
                            </div>
                            <div class="addCartButton">
                                <button class="cartButton">Agregar al carrito</button>
                            </div>
                        </div>`;
                });
            }
            else {
                products.forEach(product => {
                    cardsContent.innerHTML += `
                        <div class="card" id="${product.productId}">
                            <div class="imgCard">
                                <img src="files/card-images/add-product.png">
                            </div>
                            <div class="titleCard">
                                <p>${product.productName}</p>
                            </div>
                            <div class="priceCard">
                                <p>$${product.price}</p>
                            </div>
                        </div>`;
                });
            }
            cardsContent.style.transition = 'none';
            cardsContent.style.transform = 'translateX(0)';
            setTimeout(() => {
                cardsContent.style.transition = 'transform 0.5s ease';
            });
            
            let cartButtons = cardsContent.querySelectorAll(".cartButton");

            cartButtons.forEach(cartButton => {
                cartButton.addEventListener("click", () => {
                    let idProduct = cartButton.parentElement.parentElement.getAttribute('id');
                    
                    const decodedToken = jwt_decode(token);

                    let username = decodedToken.sub;

                    addToCart(idProduct, username);

                });
            });
        }, 100);

        

        return true;

    } catch (e) {
        console.log("Error de red: " + e);
        return false;
    }

}

async function addToCart(productIdData, username) {
    let urlCart = "http://localhost:8080/cart/add";

    let userIdData = await getUserId(username);

    let data = {
        product: {
            productId: productIdData
        },
        user: {
            userId: userIdData 
        },
        amount: 1
    };

    try {

        let response = await fetch(urlCart, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok) {
            console.log("error al intentar añadir el carrito");
            return;
        }

        console.log("añadido al carrito exitosamente");


    }
    catch(e) {
        console.log("error: "+e);
    }


}

async function getUserId(username) {
    let urlUsername = "http://localhost:8080/auth/getUserId/"+username;

    let response = await fetch(urlUsername, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    });

    if(!response.ok) {
        console.log("error al obtener userId");
        return;
    }

    let userId = await response.json();

    return userId;
}




/* dropdown menu section */

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
