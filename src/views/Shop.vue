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
        <button class="search-icon"><i class="fa fa-search"></i></button>
        <button class="cart-icon"><i class="fa fa-shopping-cart"></i></button>
        <button class="login-btn">Log In</button>
      </div>
    </header>

    <div class="container">
      <section class="hero">
        <h1>Premium Gym Apparel</h1>
        <p>Elevate your workout with our high-performance collection</p>
        <button class="shop-now" @click="Products">Shop Now</button>
      </section>

      <section class="collections">
        <div class="collection-item collection-1">
          <h2>Gym Attire</h2>
          <button>Shop Apparels</button>
        </div>
        <div class="collection-item collection-2">
          <h2>Equipment</h2>
          <button>Shop Equipment</button>
        </div>
        <div class="collection-item collection-3">
          <h2>Accessories</h2>
          <button>Shop Accessories</button>
        </div>
      </section>

      <h2>Featured Products</h2>
      <section class="featured-products">
        <div class="product-item" v-for="product in products" :key="product.id">
          <img :src="product.image" :alt="product.name" />
          <h3 class="product_name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }}</p>
          <button class="cart">Add to Cart</button>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h2>PrimeFit</h2>
          <p>Your complete fitness solution for equipment, apparel, rentals, and training.</p>
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
export default {
  name: "ShopView",
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Performance T-Shirt",
          price: "R49.99",
          image: "/images/Featured/perfomance T-shirt.jpeg"
        },
        {
          id: 2,
          name: "Training Shorts",
          price: "R39.99",
          image: "/images/Featured/training shorts.jpeg"
        },
        {
          id: 3,
          name: "Compression Leggings",
          price: "R59.99",
          image: "/images/Featured/compression-leggings.jpeg"
        },
        {
          id: 4,
          name: "Own the Run Leggings",
          price: "R34.99",
          image: "/images/Featured/men-leggings.jpeg"
        }
      ]
    };
  },
  methods: {
        Products() {
            this.$router.push("/products");
        },
    }
};
</script>

<style scoped>
#body {
  font-family: Arial, sans-serif;
  background-color: #333;
  margin: 0;
  padding: 0;
}

header {
  background-color: #333;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  align-items: center;
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

.container {
  max-width: 1200px;
  margin: 20px auto;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
}

.hero {
  padding: 50px;
  background-image: url("/public/images/Displays/apparel-hero.jpg");
  color: white;
  border-radius: 20px;
  height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  border: 2px solid crimson;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
}

.cart {
  width: 100%;
}

.shop-now {
  background-color: crimson;
  color: white;
  font-weight: bold;
}

button {
  background-color: crimson;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.collections {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  gap: 20px;
}

.collection-item {
  background-color: #d9d9d9;
  padding: 20px;
  border-radius: 20px;
  height: 300px;
  width: 500px;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: block;
  align-items: center;
  justify-content: center;
  color: white;
  border: 2px solid crimson;
  text-shadow: 2px 2px 4px rgb(220, 20, 60);
  font-size: 1.5em;
  font-weight: bold;
}

.collection-1 {
  background-image: url("/public/images/Categories/men\'s-collection.jpeg");
}

.collection-2 {
  background-image: url("/public/images/Categories/gym\ equipment_collection.jpg");
}

.collection-3 {
  background-image: url("/public/images/Categories/Accessories-\ category.jpg");
}

h2 {
  text-align: center;
  color: white;
}

.featured-products {
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  gap: 20px;
}

.product-item {
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid crimson;
  text-align: center;
  width: 300px;
}

.product-item img {
  height: 100%;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.product_name,
.product-price {
  text-align: left;
}

.product-item img {
  width: 100%;
  border-radius: 20px;
  height: auto;
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