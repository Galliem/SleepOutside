import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export async function productDetails(productId, selector) {
  product = await findProductById(productId);
  const el = document.querySelector(selector);
  el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
  document.getElementById("addToCart").addEventListener("click", addToCart(product));
}
// function addToCart() {
//   setLocalStorage("so-cart", product);
// }

// function addToCart(product) {
//   let cartItems = getLocalStorage('so-cart');
//   if (!cartItems || !Array.isArray(cartItems)) {
//     cartItems = [];
//   }
//   cartItems.push(product);
//   setLocalStorage('so-cart', cartItems);
// }

function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  //check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }
  // then add the current product to the list
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);
  // update the visible cartCount
  // cartState.count = cartContents.length;
}

function addProductToCart(product) {
  let cartItems = getLocalStorage('so-cart');
  if (!cartItems || !Array.isArray(cartItems)) {
    cartItems = [];
  }
  cartItems.push(product);
  setLocalStorage('so-cart', cartItems);
}

function productDetailsTemplate(product) {
    return `<h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.Name}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>`;
}

function cartAnimation() {
  const cartEl = document.querySelector(".cart");
  cartEl.classList.add('cart-animation');
}

document.querySelector("#addToCart").addEventListener('click', cartAnimation);