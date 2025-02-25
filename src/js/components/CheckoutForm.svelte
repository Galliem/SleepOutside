<script>
    import { getLocalStorage } from "../utils.mjs";
    import { onMount } from "svelte";
    
    let { key = "" } = $props();

    let list = $state([]);
    let subtotal = $state(0);
    let shipping = $state(0);
    let tax = $state(0);
    let total = $state(0);

    const init = function () {
        list = getLocalStorage(key);
        calculateItemSummary();
    };

    const calculateItemSummary = function() {
        const amounts = list.map((item) => item.FinalPrice);
        subtotal = amounts.reduce((sum, item) => sum + item);
    };
    
    const calculateOrdertotal = function () {
        tax = (subtotal * 0.06).toFixed(2);
        shipping = 10 + (list.length -1) * 2;
        total = (subtotal + tax + shipping).toFixed(2);
        console.log(total);

    }

    

    onMount(init);
</script>

<fieldset class="checkout-summary">
    <legend>Order Summary</legend>

    <form>
        <section class="shipping">
            <label>Shipping</label>
            <label for="fname">First Name</label>
            <input type="text" id="fname" name="fname" required>
            <label for="lname"> Last Name</label>
            <input type="text" id="lname" name="lname" required>
            <label for="street">Street</label>
            <input type="text" id="street" name="street" required>
            <label for="city">City</label>
            <input type="text" id="city" name="city" required>
            <label for="state">State</label>
            <input type="text" id="state" name="state" required>
            <label for="zip">Zip</label>
            <input type="text" id="zip" name="zip" required>
        </section>
        <section class="payment">
            <label for="cardNum">Card Number</label>
            <input type="text" id="cardNum" name="cardNum" required>
            <label for="expiration">Expiration</label>
            <input type="text" id="expiration" name="expiration" required>
            <label for="securityCode">Security Code</label>
            <input type="text" id="SecurityCode" name="securityCode" required>
        </section>
        <fieldset class="checkout-summary">
            <legend>Order Summary</legend>
            <ul>
              <li>
                <label for="cartTotal">Item Subtotal({list.length})</label>
                <p name="cartTotal" id="cartTotal">${itemTotal}</p>
              </li>
              <li>
                <label for="shipping">Shipping Estimate</label>
                <p id="shipping">${shipping}</p>
              </li>
              <li>
                <label for="tax">Tax</label>
                <p id="tax">${tax}</p>
              </li>
              <li>
                <label for="orderTotal"><b>Order Total</b></label>
                <p id="orderTotal">${orderTotal}</p>
              </li>
            </ul>
          </fieldset>        
          <button class="checkout">Checkout</button>
    </form>


    <!-- <p>${subtotal}</p>
    <p>${shipping}</p>
    <p>${tax}</p>
    <p>${total}</p>
 -->
</fieldset>