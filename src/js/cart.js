import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
  }
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
      <p class="cart-card__price">$${item.FinalPrice}</p>
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

    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
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



document.querySelector(".product-list").addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("remove-item-btn")) {
    const index = e.target.closest("li").getAttribute("data-index");
    removeCartItem(index);
  }
});

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