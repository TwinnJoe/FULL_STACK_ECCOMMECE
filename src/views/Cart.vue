<template>
  <div id="body">
    <div class="container">
      <div class="cart-items">
        <h1>Shopping Cart</h1>
        <div id="cart-items">
          <div v-if="cart.length === 0" class="empty">Your cart is empty.</div>
          <div v-for="(product, index) in cart" :key="index" class="product">
            <img class="product-image" :src="product.image_url.images[0]" :alt="product.name" />
            <div class="product-details">
              <h2>{{ product.name }}</h2>
              <p>In Stock: {{ product.stock }}, {{ product.supplier }}</p>
              <span>R{{ (product.price * 1000).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
            </div>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(index)">-</button>
              <span class="quantity">{{ product.quantity }}</span>
              <button @click="increaseQuantity(index)">+</button>
              <button @click="removeFromCart(index)">🗑️</button>
            </div>
          </div>
        </div>
      </div>

      <div class="wrapper">
        <div class="order-summary">
          <h2>Order Summary</h2>
          <div v-for="(product, index) in cart" :key="index" class="summary-row">
            <span>{{ product.name }}</span>
          </div>
          <div class="summary-row">
            <span>Items</span>
            <span>{{ totalQuantity }}</span>
            <span>R{{ subtotal.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>

          </div>
          <div class="summary-row">
            <span>Delivery</span>
            <span>R{{ delivery.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Tax</span>
            <span>R{{ tax.toFixed(2) }}</span>
          </div>
          <hr />
          <div class="summary-row total">
            <span>Total</span>
            <span>R{{ subtotal.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
          </div>
          <button class="checkout" @click="proceedToCheckout">Proceed to Checkout</button>
          <div class="card-info">
            <i class="fa-brands fa-cc-visa"></i>
            <i class="fa-brands fa-cc-mastercard"></i>
            <i class="fa-brands fa-cc-amex"></i>
            <i class="fa-brands fa-cc-paypal"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div class="toast" v-show="toastVisible">{{ toastMessage }}</div>
  </div>
</template>

<script>
export default {
  name: "CartView",
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      toastVisible: false,
      toastMessage: "",
    };
  },
  computed: {
    subtotal() {
      return this.cart.reduce((sum, product) => sum + product.price * product.quantity, 0) * 1000;
    },
    tax() {
      return this.subtotal * 0.15; // 15% tax rate
    },
    delivery() {
      return this.subtotal > 0 ? 30.0 : 0;
    },
    total() {
      return this.subtotal + this.delivery + this.tax;
    },
    totalQuantity() {
    return this.cart.reduce((sum, product) => sum + product.quantity, 0);
  }
  },

  methods: {
    showToast(message) {
      this.toastMessage = message;
      this.toastVisible = true;

      setTimeout(() => {
        this.toastVisible = false;
        this.toastMessage = "";
      }, 2000);
    },
    increaseQuantity(index) {
      this.cart[index].quantity++;
      this.updateCart();
      this.showToast(`${this.cart[index].name} quantity increased!`);
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        this.showToast(`${this.cart[index].name} quantity decreased!`);
      } else {
        this.removeFromCart(index);
      }
      this.updateCart();
    },
    removeFromCart(index) {
      this.showToast(`${this.cart[index].name} removed from cart!`);
      this.cart.splice(index, 1);
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    proceedToCheckout() {
      if (this.cart.length === 0) {
        this.showToast("Your cart is empty! Please add items to proceed.");
      } else {
        this.$router.push({
        path: '/payment',
        query: {
          subtotal: this.subtotal,
          tax: this.tax,
          delivery: this.delivery,
          total: this.total,
          totalQuantity: this.totalQuantity,
        },
      });
      }
    },
  },
  watch: {
    cart(newCart) {
      localStorage.setItem("cart", JSON.stringify(newCart)); // Sync cart changes to localStorage
    },
  },
  created() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart data when component is created
  },
};
</script>

<style scoped>
h1 {
  color: crimson;
}
#body {
  font-family: Arial, sans-serif;
  background-color: #333;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container {
  width: 80%;
  margin: auto;
  display: flex;
  background: linear-gradient(to bottom, #ffffff, #f4f4f4);
  padding: 20px;
  height: 500px;
  border-radius: 15px;
  gap: 20px;
}
.cart-items {
  width: 80%;
  border-radius: 20px;
  padding: 20px;
  height: fit-content;
  border: 1px solid crimson;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.wrapper {
  width: 40%;
  height: 400px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}
.product-image {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  background-color: #e0e0e0;
}
.product-details {
  flex-grow: 1;
  padding: 0 15px;
}
.price {
  font-weight: bold;
  color: black;
}
.quantity-controls {
  display: flex;
  align-items: center;
}
.quantity-controls button {
  background: #e0e0e0;
  color: black;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
}

.empty {
  display: flex;
  margin-top: 140px;
  justify-content: center;
  align-items: center;

}

.quantity {
  margin: 0 5px;
}
.remove {
  border: none;
  color: black;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
}
.order-summary {
  height: 90%;
  background-color: white;
  border-radius: 20px;
  border: 1px solid crimson;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 100%;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
.total {
  font-weight: bold;
  font-size: 1.1em;
}
.checkout {
  width: 100%;
  background: crimson;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}
.card-info {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

/* Toast Styling */
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px 25px;
  border-radius: 10px;
  font-size: 16px;
  z-index: 1000;
  animation: fade-in 0.3s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>
