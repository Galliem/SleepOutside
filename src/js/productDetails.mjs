import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

let product = {};

export function productDetails(productId, selector) {
    product = findProductById(productId);
    console.log(product);
    const el = document.querySelector(selector);
    el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
    document.getElementById("addToCart").addEventListener("click", addToCart);
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