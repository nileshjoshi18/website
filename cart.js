export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [{productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1, deliveryOptionId: '1'},
    {productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity : 1, deliveryOptionId: '2'}];
  } 
export function savetoStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function  addtoCart(productId){
    let matchingItem;
    cart.forEach((item) => {
        if(productId === item.id){
            matchingItem = item;
        }
    });
    if (matchingItem){
        matchingItem.quantity += 1;
    }else{
        cart.push({productId: productId,
                  quantity: 1, deliveryOptionId:'1'});
    }
    savetoStorage();

}
export function removeFromcart(productId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId){
          newCart.push(cartItem);
        }
    })
    cart = newCart;
    savetoStorage();
}