<template>
  <div id="body">
    <header>
      <div class="navbar-left">
        <h1>
          <img src="/images/logo.png" alt="logo" id="logo" />
        </h1>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/shop">Shop</router-link>
          <router-link to="/articles">Articles</router-link>
          <router-link to="/plans">Subscriptions</router-link>
        </nav>
      </div>

      <div class="navbar-right">
        <button class="login-btn">Log In</button>
      </div>
    </header>

    <section class="top">
      <h1>Choose Your Perfect Subscription Plan</h1>
      <p>
        Get access to premium gym equipment for your home or business with
        flexible rental options.
      </p>
    </section>

    <div class="container">
      <div class="duration-switch">
        <button
          v-for="duration in durations"
          :key="duration.id"
          :class="{ active: activeDuration === duration.id }"
          @click="setActiveDuration(duration.id)"
        >
          {{ duration.label }}
        </button>
      </div>

      <div class="plans" v-if="plans.length">
        <div
          class="plan"
          v-for="plan in plans"
          :key="plan.subscription_id"
          :class="{ active: selectedPlan === plan.name }"
        >
          <h2>{{ plan.name }}</h2>
          <p class="price">R{{ plan.price }} (p/m)</p>
          <ul>
            <li v-for="(feature, idx) in plan.features.split(', ')" :key="idx">✔️ {{ feature }}</li>
          </ul>
          <button class="select-plan" @click="selectPlan(plan.name)">Select Plan</button>
          <button
            v-if="selectedPlan === plan.name"
            class="continue-to-cart"
            @click="continueToCart"
          >
            Continue to Pay
          </button>
        </div>
      </div>
      <div v-else>
        <p>Loading subscription plans...</p>
      </div>
    </div>

    <h1>Why Choose PrimeFit</h1>
    <div class="why-choose">
      <div v-for="(reason, index) in reasons" :key="index">
        <span>{{ reason.icon }}</span>
        <h2>{{ reason.title }}</h2>
        <p class="text">{{ reason.description }}</p>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h2>PrimeFit</h2>
          <p>
            Your complete fitness solution for equipment, apparel, rentals, and
            training.
          </p>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="#">About Us</router-link></li>
            <li><router-link to="#">Contact</router-link></li>
            <li><router-link to="#">FAQ</router-link></li>
            <li><router-link to="#">Terms & Conditions</router-link></li>
            <li><router-link to="#">Privacy Policy</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Connect</h3>
          <ul class="social-links">
            <li><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
            <li><a href="#"><i class="fab fa-facebook-f"></i> Facebook</a></li>
            <li><a href="#"><i class="fab fa-youtube"></i> YouTube</a></li>
            <li><a href="#"><i class="fab fa-twitter"></i> Twitter</a></li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="footer-bottom">
        <p>© 2025 PrimeFit. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "PlansView",
  data() {
    return {
      activeDuration: '12 months', // Initial active duration
      selectedPlan: null,
      durations: [
        { id: '12 months', label: '12 Months' },
        { id: '24 months', label: '24 Months' },
        { id: '36 months', label: '36 Months' },
      ],
      reasons: [
        { icon: '🚚', title: 'Free Delivery', description: 'We deliver and install all equipment' },
        { icon: '🔧', title: 'Maintenance', description: 'Keep the equipment in perfect condition' },
        { icon: '🔄', title: 'Flexible', description: 'Exchange equipment whenever you want' },
        { icon: '🤝', title: 'Expert Support', description: 'Get help from our fitness specialists' },
      ],
    };
  },
  computed: {
    ...mapState({
      allPlans: state => state.subscriptions,
    }),
    plans() {
      if (!this.allPlans) return [];
      return this.allPlans.filter(plan => plan.duration_months === this.activeDuration);
    },
  },
  methods: {
    ...mapActions(['getSubscriptions']),
    setActiveDuration(durationId) {
      this.activeDuration = durationId;
    },
    selectPlan(planName) {
      this.selectedPlan = planName;
    },
    continueToCart() {
      this.$router.push('/payment'); // Navigate to payment page
    },
  },
  mounted() {
    this.getSubscriptions(); // Fetch subscription plans on mount
  },
};
</script>

<style scoped>
#body {
  font-family: Arial, sans-serif;
  background-color: #333;
  margin: 0;
  padding: 0;
  text-align: center;
}

h1,
p {
  color: white;
}

.text {
  color: #333;
}

header {
  background-color: #3333;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
}

#logo {
  height: 80px;
  width: 80px;
  vertical-align: middle;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-left h1 {
  margin: 0;
  font-size: 2em;
  font-weight: bold;
}

nav {
  margin-left: 20px;
}

nav a {
  margin: 0 15px;
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
  color: white;
  border-radius: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

nav a:hover {
  background-color: white;
  color: crimson;
  border-radius: 20px;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-right button {
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
}

.navbar-right .login-btn {
  background-color: black;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.top {
  margin: 10px 0;
  height: 200px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  background-color: #333;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.duration-switch {
  margin-top: 30px;
  margin-bottom: 20px;
}

.duration-switch button {
  cursor: pointer;
  font-weight: bold;
  margin: 0 10px;
  padding: 10px;
  border: none;
  background-color: white;
  color: crimson;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.duration-switch .active {
  background-color: crimson;
  color: white;
}

.plans {
  display: flex;
    justify-content: center;
    gap: 20px;
}

.plan {
  background-color: white;
    border: 2px solid crimson;
    border-radius: 8px;
    text-align: center;
    padding: 20px;
    margin: 15px;
    width: 30%; /* Plan card width - should be controlling width */
    display: flex; /* Flexbox for vertical layout */
    flex-direction: column;
    position: relative;
    padding-bottom: 100px; /* Sufficient bottom padding */
    box-sizing: border-box; /* Add box-sizing to .plan as well, for consistency */ 
}

.plan.active {
  background-color: #333;
  color: white;
}

label {
  text-align: center;
  justify-items: center;
}

.plan h2 {
  margin: 0;
}

.price {
  font-size: 24px;
  color: #333;
  font-weight: bold;
}

.features {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.features input {
  display: none;
}

.features label {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}


.plan.active .select-plan  {
  background-color: crimson;
  color: white;
}

.plan.active p.price {
  color: white;
}

.select-plan:hover {
  background-color: crimson;
}

.plan ul {
  list-style: none;
  padding: 0;
}

.plan li {
  padding: 5px 0;
}

.continue-to-cart {
    background-color: crimson; /* Crimson color for "Continue to Cart" */
}

.select-plan,
.continue-to-cart { /* Apply to both buttons together */
  background-color: #333;
    color: white;
    padding: 10px 20px;
    margin-top: 10px; /* Add some margin for spacing */
    border: none;
    width: calc(100% - 40px); /* Adjust width to account for left and right padding */
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
    position: absolute; /* Absolutely positioned */
    bottom: 20px; /* Position from the bottom */
    left: 20px; /* Position from the left */
    right: 20px; /* Position from the right */
    
}  

.continue-to-cart:hover {
    background-color: #ff4d6d; /* Slightly lighter crimson on hover */
}

.why-choose {
  display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px auto; 
    max-width: 1200px; 
    width: 90%; 
    justify-content: center; 
    gap: 20px; 
}

.why-choose div {
  background-color: #f9f9f9;
    border: 2px solid crimson;
    border-radius: 8px;
    padding: 20px; 
    margin: 10px;
    width: 300px; 
    text-align: center;
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    box-sizing: border-box;
    word-wrap: break-word; 
}

.why-choose div:hover {
  transform: scale(1.05);
}


.why-choose div span { 
    display: block; 
    margin-bottom: 10px;
}

.why-choose div h2 {
    font-size: 1.4em; 
    margin-bottom: 5px; 
}

.why-choose div p.text { 
    font-size: 1em; 
    line-height: 1.4; 
}

.footer {
  background-color: #333;
  color: white;
  padding: 40px 20px;
  border-top: 2px solid crimson;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-right: 20px;
}

.footer-section h2,
.footer-section h3 {
  font-size: 1.6em;
  margin-bottom: 10px;
}

.footer-section p {
  font-size: 1em;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
  font-size: 1.2em;
}

.footer-section ul li a:hover {
  color: #f39c12;
}

.social-links {
  display: flex;
  gap: 10px;
  align-items: center;
}

.social-links li {
  display: inline-block;
}

.social-links li a {
  display: flex;
  align-items: center;
  gap: 8px;
}

.social-links li i {
  font-size: 1.4em;
}

.footer-bottom {
  text-align: center;
  font-size: 1em;
  margin-top: 20px;
}

.footer-bottom p {
  margin: 0;
}

</style>