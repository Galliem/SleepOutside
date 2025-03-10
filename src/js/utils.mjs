import { mount } from 'svelte';
import MainHeader from './components/MainHeader.svelte';
import MainFooter from './components/MainFooter.svelte';
import AlertMessage from './components/AlertMessage.svelte';

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // const product = urlParams.get('product')
  return urlParams.get(param);
}

export function getCartCount() {
  const count = getLocalStorage("so-cart")?.length ?? 0;
  return count;
}

export function renderHeaderFooter() {
  const header = mount(MainHeader, {
    target: document.querySelector('#indexHeader')
  });
  const footer = mount(MainFooter,{
    target: document.querySelector("#indexFooter")
  });
}

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function alertMessage(message, scroll=true, duration = 3000) {
  const alert = mount(AlertMessage, {
    target: document.querySelector('body'),
    anchor: document.querySelector('main'),
    props: {
      message,
    }
  });

  if (scroll) window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => alert.remove());
}