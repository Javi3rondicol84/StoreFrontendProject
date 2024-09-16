"use strict";

const api = "http://localhost:8080/products/"

//select carousels container
let carouselsdiv = document.querySelector(".all-carousels");

setAllCarousels();

//create all carousels and add them to carousels div
async function setAllCarousels() {
    let categories = [];
    carouselsdiv.innerHTML = "";
    try {
        let response = await fetch(api + "categories/");
        if (!response.ok) {
            console.log("No se pudo traer la respuesta");
        }

        let allData = await response.json();

        for(let category of allData) {
            categories.push(category);
            carouselsdiv.innerHTML += `
                <div class="carousel">
                    <button data-category="${category}" class="btn-carousel-left"><img src="files/left-arrow.png"></button>
                    <button data-category="${category}" class="btn-carousel-right"><img src="files/right-arrow.png"></button>
                    <div class="cards-section">
                        <h2>Los 5 más vendidos en ${category}</h2>
                          <div class="cards" id="${category}">
                          
                          </div>
                    </div>
            </div>
           `;
        }

        await showCardsByCategory(categories);

        await addToCartOfUser();

    } catch (e) {
        console.log("Error de red");
    }
}

async function addToCartOfUser() {
    let addToCartsButtons = document.querySelectorAll(".cart-button");

    addToCartsButtons.forEach(cartButton => {
        cartButton.addEventListener("click", async () => {
            if(!token) {
                location.href = "/pages/login.html";
                return;
            }
            else {

                const decodedToken = parseJwt(token);

                let username = decodedToken.sub;

                let idProduct = cartButton.getAttribute("name");

                await addToCart(idProduct, username);
            }

        });
    });

}

//add product to cart of user
async function addToCart(idProduct, username) {
    let idProductData = Number(idProduct);
    let urlCart = "http://localhost:8080/cart/add";

    let userIdData = await getUserId(username);

    let data = {
        product: {
            productId: idProductData
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

//load cards in every carousel
async function showCardsByCategory(categories) {

    let i = 0;
    for (i = 0; i < categories.length; i++) {

        let page = 0;
        let cardsDiv = document.querySelector(`#${categories[i]}`);

        await loadCards(categories[i], page);

        //cards -> cardSection -> carousel (of current cards)
        let buttonsContainer = cardsDiv.parentElement.parentElement;

        let leftButton = buttonsContainer.querySelector(".btn-carousel-left");
        let rightButton = buttonsContainer.querySelector(".btn-carousel-right");


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

//create all cards in carousels and made pagination
async function loadCards(category, page, direction) {

    let cardsContent = document.querySelector(`#${category}`);
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
            cardsContent.style.transform = 'translateX(50%)';
        } else if (direction === 'right') {
            cardsContent.style.transform = 'translateX(-50%)';
        }

            cardsContent.innerHTML = "";
                products.forEach(product => {
                    cardsContent.innerHTML += `
                          <div class="card" id="${product.productId}">
                            <div class="card-image">
                                <img src="files/add-product.png">
                            </div>
                            <div class="card-product-name">
                                <h3>${product.productName}</h3>
                            </div>
                            <div class="card-price-amount-product">
                                <div class="price-card">
                                    <p>$${product.price}</p>
                                </div>
                 <!--               <div class="amount-products-card">
                                 <button>-</button>
                                    <p>1</p>
                                    <button>+</button>
                                </div>-->
                            </div>
                            <div class="card-buttons">
                                <div class="add-to-cart-btn">
                                    <button class="cart-button" name="${product.productId}"><img src="files/shopping-cart-card.png"></button>
                                </div>
                                <div class="buy-btn">
                                    <button class="cartButton" name="${product.productId}">Comprar</button>
                                </div>
                            </div>
                        </div>
                       `;
                });
        return true;

    } catch (e) {
        console.log("Error de red: " + e);
        return false;
    }

}

//get user id from username
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