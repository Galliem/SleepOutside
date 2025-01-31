import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  //check if there is something in the list, pull from localstorage
    let cartItems = getLocalStorage("so-cart");
  const product = await findProductById(e.target.dataset.id);
  //check if list is empty
  if (!cartItems) {
    cartItems = []
  }
//add new product to the list
cartItems.push(product)
//add list to cart
  
  addProductToCart(cartItems);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
