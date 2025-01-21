import { setLocalStorage, getLocalStorage, getParam } from './utils.mjs';
import { findProductById } from './productData.mjs';
import { productDetails } from './productDetails.mjs';

// Moved it to productDetails.mjs
// function addProductToCart(product) {
//   let cartItems = getLocalStorage('so-cart');
//   if (!cartItems || !Array.isArray(cartItems)) {
//     cartItems = [];
//   }
//   cartItems.push(product);
//   setLocalStorage('so-cart', cartItems);
// }


// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);

const productId = getParam('product');
productDetails(productId, '.product-detail');

console.log(findProductById(productId));