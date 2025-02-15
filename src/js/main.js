// import ProductList from './components/ProductList.svelte';
// import { mount } from 'svelte';
import { renderHeaderFooter } from './utils.mjs';

// const productList = mount(ProductList, {
//   target: document.querySelector('.products'),
//   props: { category: "tents"},
// });

function renderCategories() {
  document.querySelector(".categories").innerHTML=categoriestemplate();
}

function categoriestemplate() {
  return `<a href="product-list/product-index.html?category=tents">
      <img src="../images/tent_icon.svg" alt="Tent Icon from Noun Project: Mustofa Bayu" >
      <p>Tents</p>
    </a>
    <a href="product-list/product-index.html?category=backpacks">
      <img src="../images/noun_carrier bag_3544771.svg" alt="Tent Icon from Noun Project: Mustofa Bayu">
      <p>Backpacks</p>
    </a>
    <a href="product-list/product-index.html?category=sleepingBags">
      <img src="../images/noun_Sleeping Bag_3544775.svg" alt="Tent Icon from Noun Project: Mustofa Bayu">
      <p>Sleeping Bags</p>
    </a>
    <a href="product-list/product-index.html?category=hammocks">
      <img src="../images/noun_Hammock_791143.svg" alt="Tent Icon from Noun Project: Mustofa Bayu">
      <p>Hammocks</p>
    </a>
`
}

renderCategories();
renderHeaderFooter();