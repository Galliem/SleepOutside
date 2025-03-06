import { renderHeaderFooter } from './utils.mjs';
import { getParam } from './utils.mjs';
import { mount } from 'svelte';
import LoginForm from './components/LoginForm.svelte';

renderHeaderFooter();
const redirect = getParam('redirect');
console.log(redirect);

mount(LoginForm,{
    target: document.querySelector('.loginForm'),
    props: { key: "so-token"},
})

function getInfo(){
    const username = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    console.log(email);
    login({email, password}, redirect);
}
    

document.querySelector('.loginForm').addEventListener("click", getInfo());