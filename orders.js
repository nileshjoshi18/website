import { cart,savetoStorage } from "./cart.js";
import { products } from "./product.js";

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; 
let orderHTML = '';
let matchingProduct;
cart.forEach((cartItem) => {
    products.forEach((product) => {
        if(product.id === cartItem.productId){
            matchingProduct = product;
        };
    });
    console.log("test");
    const today = dayjs();
    const dateString = today.format('dddd, MMMM D');  
    orderHTML += `
        <div class="order-container">
            <header class="order-header">
                <div class="order-placed-date">
                    <div class="order-label">Order placed on:</div>
                    <div class="order-date">${dateString}</div>
                </div>
                <div class="delivery-date">
                    <div class="order-label">Delivery date:</div>
                    <div class="delivery-on-date">${dateString}</div>
                </div>
                <div class="total">
                    <div class="order-label">Total:</div>
                    <div class="order-price">₹</div>
                </div>
                <div class="orderId">
                    <div class="order-label">Order Id:</div>
                    <div class="order-number">${matchingProduct.id}</div>
                </div>
            </header>
            <div class="order-section-grid">
                <div class="order-details-left-section">
                    <img class="product-image" src="${matchingProduct.image}">
                </div>
                <div class="order-details-right-section">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ₹ ${matchingProduct.priceCents}/-
                    </div>
                    <div class="product-quantity">
                        <span>
                          Quantity:<span class="quantity-label">1</span>
                        </span>
                    </div>
                    <div class="update-quantity-link link-primary">
                        Cancel order
                    </div>
                    <div class="order-address">
                        <div class="order-address-label">
                            Delivery Address:
                        </div>
                        <div class="delivery-address">
                            C-18/6,Snehmilan CHS,Sect-48,Nerul,Navi Mumbai-400706
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
});
document.querySelector('.order-page').innerHTML = orderHTML;
savetoStorage();