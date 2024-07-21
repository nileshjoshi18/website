import { products,getProduct } from './product.js';
import{ cart,removeFromcart} from './cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; 
import {deliveryOptions} from './delivery.js';

let productPriceCents = 0;
cart.forEach((item) => {
const product = getProduct(item.productId);
  productPriceCents += product.priceCents*item.quantity;
});
let deliveryFees = productPriceCents * 0.03;
let costBeforeTax = deliveryFees + productPriceCents;
let taxation = costBeforeTax * 0.08;
let orderTotal = (costBeforeTax + taxation).toFixed(0);
let orderPrice = orderTotal;
console.log("Test");
document.querySelector('.js-item-price').innerHTML = `₹ ${productPriceCents}`;
document.querySelector('.js-handling-charges').innerHTML = `₹ ${deliveryFees}`;
document.querySelector('.js-itemprice-beforetax').innerHTML = `₹ ${costBeforeTax}`;
document.querySelector('.js-taxation-charges').innerHTML = `₹ ${taxation}`;
document.querySelector('.js-total-money').innerHTML = `₹ ${orderPrice}`;
function renderOrderSummary(){
  let cartHTML = '';
  cart.forEach((cartProduct) => {
      const productId = cartProduct.productId;
      let matchingItem;
      products.forEach((product) =>{

      if (product.id === productId){
              matchingItem = product;
      } 
      });
      const deliveryOptionId = cartProduct.deliveryOptionId;
      let deliveryOption;
      deliveryOptions.forEach((option)=>{
        if(deliveryOptionId === option.id){
          deliveryOption = option;
        }
      }); 
      const today = dayjs();
      const dateString = today.format('dddd, MMMM D');
      cartHTML += `<div class="checkout-grid">
                      <div class="order-summary">
                        <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
                          <div class="delivery-date">
                            Delivery Date : ${dateString}
                          </div>

                          <div class="cart-item-details-grid">
                            <img class="product-image"
                              src="${matchingItem.image}"> 
                            <div class="cart-item-details">
                              <div class="product-name">
                                ${matchingItem.name}
                              </div>
                              <div class="product-price">
                                  ₹${matchingItem.priceCents}
                              </div>
                              <div class="product-quantity">
                                <span>
                                  Quantity: <span class="quantity-label">${cartProduct.quantity}</span>
                                </span>
                                <span class="update-quantity-link link-primary">
                                  Update
                                </span>
                                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                                  Delete
                                </span>
                              </div>
                                                        
                              <div class="delivery-options">
                                <div class="delivery-options-title">
                                  Delivery day:
                                </div>
                                <div class="delivery-option">
                                  <input type="radio" checked
                                    class="delivery-option-input"
                                    name="delivery-option-${matchingItem.id}">
                                <div>
                                    <div class="delivery-option-date">
                                      ${dateString}
                                    </div>
                                    <div class="delivery-option-price">
                                      Delivery Charges applicable
                                    </div>
                                  </div>
                                </div>
                              </div>
                           </div>
                    </div>    
                  </div>`;   
                  
                });
  
  document.querySelector('.js-order-summary').innerHTML = cartHTML;
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      let productId = link.dataset.productId;
      removeFromcart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      renderOrderSummary();
      
    })
  });
}
renderOrderSummary();