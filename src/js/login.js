import { renderHeaderFooter } from './utils.mjs';
import { getParam } from './utils.mjs';

//  Add an event listener to our login form's button, when the button is clicked:
//  Get the username and password out of the form fields.
//  Pass those to the login function along with the redirect information we gathered above.

renderHeaderFooter();

mount(LoginForm,{
    target: document.querySelector('.loginForm'),
    props: { key: "so-cart"},
})

const redirect = getParam('redirect');
console.log(redirect)

function getInfo(){
    const username = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    console.log(email);
    login({email, password}, redirect);
}
    

document.querySelector('.loginForm').addEventListener("click", getInfo());