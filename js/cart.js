"use strict";

//traer id usuario

showAllProductsInCart();

async function showAllProductsInCart() {

    if(token) {
        let productsCartDiv = document.querySelector(".cartItems");
        productsCartDiv.innerHTML = "";
        const decodedToken = jwt_decode(token);
        let userId = await getUserId(decodedToken.sub);
    
        const urlProducts = "http://localhost:8080/cart/products/"+userId;

        try {
            let response = await fetch(urlProducts, {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            })

            let allProductsInCart = await response.json();

            allProductsInCart.forEach(productInCart => {
                productsCartDiv.innerHTML += `
                    <div class="cartItem" id="${productInCart.cartId}">
                        <div class="titleProductCart">
                            <h2>${productInCart.product.productName}</h2>
                            <div>
                             <button class="incrementAmount">+</button>
                             <p class="amountSelected">${productInCart.amount}</p>
                             <button class="decrementAmount">-</button>
                            </div>
                            <p>${productInCart.product.price}</p>
                        </div>
                        <div>
                          <button class="deleteFromCart">Borrar</button>
                        </div>
                    </div>
                `;
            });


            let incrementButtons = document.querySelectorAll(".incrementAmount");
            let decrementButtons = document.querySelectorAll(".decrementAmount");

            let deleteButtons = document.querySelectorAll(".deleteFromCart");

            incrementButtons.forEach(incrementButton => {

                incrementButton.addEventListener("click", () => {
                    let cartId = incrementButton.parentElement.parentElement.parentElement.getAttribute('id');  
                    let amount = incrementButton.nextElementSibling.innerHTML;

                    amount = Number(amount);
                    amount += 1;
                    updateAmount(cartId, amount, token);
                    showAllProductsInCart();
                });

            });

            decrementButtons.forEach(decrementButton => {

                decrementButton.addEventListener("click", () => {
                    let cartId = decrementButton.parentElement.parentElement.parentElement.getAttribute('id');
                    let amount = decrementButton.previousElementSibling.innerHTML;
                    if(amount > 1) {
                        amount = Number(amount -= 1);
                        updateAmount(cartId, amount, token);   
                        showAllProductsInCart();
                    }
                   
                });
        
            });

            deleteButtons.forEach(deleteButton => {
                deleteButton.addEventListener("click", () => {
                    let cartId = deleteButton.parentElement.parentElement.getAttribute('id');

                    deleteItemFromCart(cartId, token);
                    showAllProductsInCart();
                });
            });


            showPurchaseSummary(allProductsInCart);

        }
        catch(e) {
            console.log("error de red"+e);
        }

        
    }
    else {
        window.location.href = "../index.html";
    }
    
}

async function deleteItemFromCart(cartId, token) {
    let urlDelete = "http://localhost:8080/cart/delete/"+cartId;

    try {
        let response = await fetch(urlDelete, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        })

        if(!response.ok) {
            console.log("no se pudo elimianr el item con el id: "+cartId);
            return;
        }

        console.log("item eliminado correctamente");

    }
    catch(e) {
        console.log("error de red");
    }


}

async function updateAmount(cartId, amount, token) {
    let url = "http://localhost:8080/cart/updateAmount/"+cartId;

    try {
        let response = await fetch(url, {
            "method": "PUT",
            "headers": {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            "body": JSON.stringify(amount)
        });

        if(!response.ok) {
            console.log("solicitud put fallida");
            return;
        }

        console.log("cantidad actualizada correctamente");

    }
    catch(e) {
        console.log("no se pudo actualizar el producto en el carrito: "+e);
    }




}

function showPurchaseSummary(allProductsInCart) {
    
    let amountProducts = document.querySelector("#amountProducts");
    let totalPurchase = document.querySelector("#totalPurchase");

    let totalPriceProducts = getTotalPrice(allProductsInCart);
    let totalAmountProducts = getTotalAmount(allProductsInCart);

    amountProducts.innerHTML = `Cantidad de Productos: ${totalAmountProducts}`;
    
    totalPurchase.innerHTML = `$${totalPriceProducts}`;
}

function getTotalAmount(allProductsInCart) {
    let amount = 0;

    for(let i = 0; i < allProductsInCart.length; i++) {
        amount += Number(allProductsInCart[i].amount);
    }

    return amount;
}

function getTotalPrice(allProductsInCart) {
    let totalPrice = 0;

    for(let i = 0; i < allProductsInCart.length; i++) {
        let price = Number(allProductsInCart[i].product.price);
        let amount = Number(allProductsInCart[i].amount);
        totalPrice += price * amount;
    }

    return totalPrice;
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
