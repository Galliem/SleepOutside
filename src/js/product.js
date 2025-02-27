import { setLocalStorage, getLocalStorage, getParam } from './utils.mjs';
import { findProductById } from './productData.mjs';
import { productDetails } from './productDetails.mjs'; 
import { addToCart } from './productDetails.mjs'
import { doc } from 'prettier';


// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  // .addEventListener('click', addToCartHandler);

const productId = getParam('product');
productDetails(productId, '.product-detail');

console.log(findProductById(productId));
