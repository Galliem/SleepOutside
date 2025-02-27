import { renderHeaderFooter } from './utils.mjs';
import CheckoutForm from './components/CheckoutForm.svelte'
import { mount } from 'svelte';

// document.querySelector('.checkoutInfo').insertAdjacentElement('afterbegin', CheckoutForm);

renderHeaderFooter();


mount(CheckoutForm,{
    target: document.querySelector('.checkoutInfo'),
    props: { key: "so-cart"},
})