import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
  }
  
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function getTotal(cartItems){
  let total = 0;
  cartItems.forEach(item => {
    total += item.FinalPrice *(item.quantity || 1);
  });
  console.log(total);
  // const cartTotal =  "<p>$${total.toFixed(2)}</p>"
  document.querySelector(".cart-total").insertAdjacentHTML("afterbegin", totalTemplate(total));
  return total;
}

function totalTemplate(total) {
  return `<p>Total: $${total.toFixed(2)}</p>`
}

const cartItems = getLocalStorage("so-cart");
renderCartContents();
getTotal(cartItems);