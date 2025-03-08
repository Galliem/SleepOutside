import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
  }

  getTotal(cartItems);
}

function cartItemTemplate(item, index) {
  const newItem = `
    <li class="cart-card divider" data-index="${index}">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">
        qty: <input type="number" class="quantity-input" value="${item.quantity || 1}" data-index="${index}" min="1" />
      </p>
      <p class="cart-card__price" data-price="${item.FinalPrice}">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
      <button class="remove-item-btn">Remove</button>
    </li>
  `;
  return newItem;
}

document.addEventListener('input', function(event) {
  if (event.target && event.target.classList.contains('quantity-input')) {
    const index = event.target.getAttribute('data-index');
    const quantity = parseInt(event.target.value);

    if (quantity > 0) {
      updateCartItemQuantity(index, quantity);
    }
  }
});

function updateCartItemQuantity(index, quantity) {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems[index]) {
    cartItems[index].quantity = quantity;

    const item = cartItems[index];
    const priceElement = document.querySelector(`.cart-card[data-index='${index}'] .cart-card__price`);
    priceElement.textContent = `$${(item.FinalPrice * quantity).toFixed(2)}`;

    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
}

function removeCartItem(index) {
  const cartItems = getLocalStorage("so-cart");
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

document.querySelector(".product-list").addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("remove-item-btn")) {
    const index = e.target.closest("li").getAttribute("data-index");
    removeCartItem(index);
  }
});

function getTotal(cartItems){
  let total = 0;
  cartItems.forEach(item => {
    total += item.FinalPrice * (item.quantity || 1);
  });
  console.log(total);
  document.querySelector(".cart-total").innerHTML = totalTemplate(total);
  return total;
}

function totalTemplate(total) {
  return `<p>Total: $${total.toFixed(2)}</p>`;
}

const cartItems = getLocalStorage("so-cart");
renderCartContents();
