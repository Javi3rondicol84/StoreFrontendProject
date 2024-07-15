"use strict";

const api = "http://localhost:8080/products/"

//all carousels
let carouselsdiv = document.querySelector("#carousels");

let dos = 2;

setAllCarousels();


async function setAllCarousels() {

        try {
            //let response = await fetch(api+"limit?limitValue=5");
            let response = await fetch(api+"categories/");

            if(!response.ok) {
                alert("no se pudo traer la respuesta");
            }

            let allData = await response.json();

            allData.forEach(carousel => {



                
                carouselsdiv.innerHTML += 
                    `
                    <div class="carousel">
                        <div class="sellersTitle">
                            <h2>Los 5 Más vendidos en ${carousel}</h2>
                        </div>
                        <div class="cards">
                            <div class="card">
                                <div class="imgCard">
                                    <img src="files/card-images/shoe.jpg">
                                </div>
                                <div class="titleCard">
                                    <p>Zapatilla</p>
                                </div>
                                <div class="priceCard">
                                    <p>$3000</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="imgCard">
                                    <img src="files/card-images/shoe.jpg">
                                </div>
                                <div class="titleCard">
                                    <p>Zapatilla</p>
                                </div>
                                <div class="priceCard">
                                    <p>$3000</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="imgCard">
                                    <img src="files/card-images/shoe.jpg">
                                </div>
                                <div class="titleCard">
                                    <p>Zapatilla</p>
                                </div>
                                <div class="priceCard">
                                    <p>$3000</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="imgCard">
                                    <img src="files/card-images/shoe.jpg">
                                </div>
                                <div class="titleCard">
                                    <p>Zapatilla</p>
                                </div>
                                <div class="priceCard">
                                    <p>$3000</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="imgCard">
                                    <img src="files/card-images/shoe.jpg">
                                </div>
                                <div class="titleCard">
                                    <p>Zapatilla</p>
                                </div>
                                <div class="priceCard">
                                    <p>$3000</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
                }


            );

        }
        catch(e) {
            alert("error de red");
        }





}