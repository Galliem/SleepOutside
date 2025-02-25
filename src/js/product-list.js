import ProductList from '../js/components/ProductList.svelte';
import { mount } from 'svelte';
import { getParam, renderHeaderFooter } from './utils.mjs';

const category = getParam('category');

const productList = mount(ProductList, {
    target: document.querySelector('.products'),
    props: { category: category},
  });

  renderHeaderFooter();