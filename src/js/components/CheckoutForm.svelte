<script>
    import { getLocalStorage, formDataToJSON, setLocalStorage, alertMessage, removeAllAlerts } from "../utils.mjs";
    import { onMount } from "svelte";
    import { checkout } from '../externalServices.mjs';
    
    let { key = "" } = $props();

    let list = $state([]);
    let subtotal = $state(0);
    let shipping = $state(0);
    let tax = $state(0);
    let total = $state(0);

    const init = function () {
        list = getLocalStorage(key)||[];
        calculateItemSummary();
    };

    const calculateItemSummary = function() {
        const amounts = list.map((item) => item.FinalPrice);
        subtotal = amounts.reduce((sum, item) => sum + item, 0).toFixed(2);
        calculateOrdertotal(subtotal);
    };
    
    const calculateOrdertotal = function (subtotal) {
        tax = (subtotal * 0.06).toFixed(2);
        shipping = 10 + (list.length -1) * 2;
        total = (parseFloat(subtotal) + parseFloat(tax) + parseFloat(shipping)).toFixed(2);
    }

    // const handleFormSubmit = function(ev) {
    //   ev.preventDefault();
    // }

    const packageItems = function(items) {
      const simplifiedItems = items.map((item) => {
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
      });
      return simplifiedItems;
    };

    const handleSubmit = async function (e) {
      e.preventDefault();
      const json = formDataToJSON(this);
      // add totals, and item details
      json.orderDate = new Date();
      json.orderTotal = total;
      json.tax = tax;
      json.shipping = shipping;
      json.items = packageItems(list);
      console.log(json);
      try {
        const res = await checkout(json);
        console.log(res);
        setLocalStorage('so-cart', []);
        location.assign("/checkout/success.html");
      } catch (err) {
        removeAllAlerts();
        for (let message in err.message) {
          alertMessage(err.message[message])
        }
        console.log(err);
      }
    };

    onMount(init);
</script>

<fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    <section class="alert"></section>
    <form name="checkout" onsubmit={handleSubmit}>
        <section class="shipping">
            <legend>Shipping</legend>
            <label for="fname">First Name</label>
            <input type="text" id="fname" name="fname" required>
            <label for="lname"> Last Name</label>
            <input type="text" id="lname" name="lname" required>
            <label for="street">Street</label>
            <input type="text" id="street" name="street" required>
            <label for="city">City</label>
            <input type="text" id="city" name="city" required>
            <label for="state">State</label>
            <input type="text" id="state" name="state" placeholder="ST" required>
            <label for="zip">Zip</label>
            <input type="text" id="zip" name="zip" placeholder="12345" required>
        </section>
        <section class="payment">
            <legend>Payment</legend>
            <label for="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" name="cardNumber" placeholder="1234123412341234" required>
            <label for="expiration">Expiration</label>
            <input type="text" id="expiration" name="expiration" placeholder="11/27" required>
            <label for="code">Security Code</label>
            <input type="text" id="code" name="code" placeholder="123" required title="Enter a 3-digit code">        
          </section>
        <fieldset class="checkout-summary">
            <legend>Order Summary</legend>
            <ul>
              <li>
                <label for="cartTotal">Item Subtotal({list.length})</label>
                <p name="cartTotal" id="cartTotal">${subtotal}</p>
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
                <p id="orderTotal">${total}</p>
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
