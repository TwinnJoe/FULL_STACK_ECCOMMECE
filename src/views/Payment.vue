<template>
  <div id="body">
    <div class="container">
      <Toast ref="toast" />
      <h1>Complete Your Payment</h1>
      
      <!-- Order Summary Section -->
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Items:</span>
          <span>{{ orderSummary.totalQuantity }}</span>
          <span>R{{ orderSummary.subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax:</span>
          <span>R{{ orderSummary.tax.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Delivery:</span>
          <span>R{{ orderSummary.delivery.toFixed(2) }}</span>
        </div>
        <hr />
        <div class="summary-row total">
          <span>Total:</span>
          <span>R{{ orderSummary.total.toFixed(2) }}</span>
        </div>
      </div>

      <!-- Premium Plan Section -->
      <div class="plan">
        <h2>Premium Plan</h2>
        <p>Monthly subscription • Cancel anytime</p>
        <p class="amount">R{{ orderSummary.total.toFixed(2) }}</p>
      </div>

      <!-- Payment Form -->
      <form @submit.prevent="handlePayment">
        <input type="text" v-model="cardNumber" placeholder="Card Number" required aria-label="Card Number" />
        <div class="expiry-cvc">
          <input type="text" v-model="expiryDate" placeholder="MM/YY" required aria-label="Expiry Date" />
          <input type="text" v-model="cvc" placeholder="CVC" required aria-label="CVC" />
        </div>
        
        <!-- Cryptocurrency Selection -->
        <h3>Cryptocurrency</h3>
        <select v-model="selectedCrypto" @change="toggleCryptoAddress" aria-label="Select Cryptocurrency">
          <option value="" disabled>Select a cryptocurrency</option>
          <option value="bitcoin">Pay with Bitcoin</option>
          <option value="ethereum">Pay with Ethereum</option>
          <option value="bitcash">Pay with BitCash</option>
        </select>
        
        <input v-if="showCryptoAddress" type="text" v-model="cryptoAddress" placeholder="Enter your cryptocurrency address" required aria-label="Cryptocurrency Address" />
        
        <!-- Other Payment Options -->
        <h3>Other Payment Options</h3>
        <button type="submit" class="complete-payment" :disabled="!isFormValid">Complete Payment</button>
      </form>
      
      <p class="footer-note">Secure payment processed by Payfast.</p>
      <p class="footer">© 2025 PrimeFit. All rights reserved.</p>
    </div>
  </div>

  <!-- Payment Success Modal -->
  <div v-if="showModal" class="modal-overlay" aria-labelledby="payment-modal">
    <div class="modal">
      <h2>Payment Successful</h2>
      <p>Your payment of R{{ orderSummary.total.toFixed(2) }} has been processed successfully.</p>
      <button @click="closeModal" aria-label="Close Modal">OK</button>
    </div>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
  name: "PaymentView",
  components: {
    Toast,
  },
  data() {
    return {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      selectedCrypto: '',
      showCryptoAddress: false,
      cryptoAddress: '',
      showModal: false,
    };
  },
  computed: {
    orderSummary() {
      return {
        subtotal: parseFloat(this.$route.query.subtotal) || 0,
        tax: parseFloat(this.$route.query.tax) || 0,
        delivery: parseFloat(this.$route.query.delivery) || 0,
        total: parseFloat(this.$route.query.total) || 0,
        totalQuantity: parseInt(this.$route.query.totalQuantity) || 0,
      };
    },
    // Validate form state
    isFormValid() {
      return this.cardNumber && this.expiryDate && this.cvc && (this.selectedCrypto || this.cardNumber.length === 16);
    }
  },
  methods: {
    toggleCryptoAddress() {
      this.showCryptoAddress = this.selectedCrypto !== '';
    },
    handlePayment() {
      if (!this.isFormValid) {
        this.$refs.toast.show("Please complete all required fields.");
        return;
      }
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
  created() {
    console.log("Route Query:", this.$route.query);
  }
};
</script>

<style scoped>
#body {
  font-family: Arial, sans-serif;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.container {
  background-color: #fff;
  padding: 30px;
  margin: 30px;
  border-radius: 8px;
  height: fit-content;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

/* Overall container for the order summary */
.order-summary {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}

/* Title of the order summary */
.order-summary h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
  font-weight: bold;
}

/* Each row in the summary (Items, Tax, Delivery, Total) */
.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
}

.summary-row span {
  color: #555;
}

/* Style for the total row */
.summary-row.total {
  font-weight: bold;
  font-size: 1.2rem;
}

.summary-row.total span {
  color: #000;
  font-size: 1.4rem;
}

hr {
  border: 0;
  height: 1px;
  background-color: #ddd;
  margin: 15px 0;
}

/* Optional: Plan styling */
.plan {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.);
}

.plan h2 {
  font-size: 1.25rem;
  color: #333;
}

.plan p {
  color: #777;
  font-size: 1rem;
}

.plan .amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.plan p {
  display: block;
  text-align: left;
  margin-bottom: 20px;
}

.plan p.amount {
  text-align: right;
}

.amount {
  font-size: 24px;
  font-weight: bold;
}

.card-info {
  display: flex;
  justify-content: left;
  gap: 5px;
  margin-bottom: 10px;
}

.card-logo {
  margin: 0 10px;
  width: 30px;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid crimson;
  border-radius: 5px;
}

.expiry-cvc {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.expiry-cvc input {
  width: calc(50% - 10px);
}

button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.crypto-button {
  background-color: #F7931A;
  color: white;
}

.apple-pay {
  background-color: #000;
  color: white;
}

.complete-payment {
  background-color: crimson;
  color: white;
}

.footer-note {
  text-align: center;
  margin: 10px 0;
  font-size: 12px;
}

.footer {
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
}

select {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid crimson;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

select:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0. 5);
}

option {
  font-size: 16px;
  padding: 8px;
  background-color: #fff;
  color: #333;
}

option:hover {
  background-color: #F1F1F1;
}

.crypto-address {
  display: none;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid crimson;
  border-radius: 5px;
  font-size: 16px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.modal button {
  margin-top: 10px;
  padding: 10px;
  background: crimson;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>











Message Asiphesona Dumzela, Ethan Paulsen, Moegamat Surur Samaai
