<script>
    import {getProductsByCategory} from '../externalServices.mjs';
    import ProductSummary from './ProductSummary.svelte';
    // this is how we make a prop in svelte
    let {category} = $props();
    // if you are looking at this thinking that's strange to just stop with a promise
    // you would be right.  This will make more sense in a bit...stay tuned.
    let promise = getProductsByCategory(category);
</script>

<h2>Top Products: {category}</h2>
{#await promise}
  <p>Loading</p>
{:then products}
    <ul class="product-list">
        {#each products as product}
            <li class="product-card"><ProductSummary {product} /></li>
        {/each}
    </ul> 
{/await} 