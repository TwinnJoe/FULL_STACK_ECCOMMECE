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
    </header>

    <div class="container">
      <h1>Fitness Blog</h1>
      <div class="articles">
        <div class="article-card" v-for="article in articles" :key="article.id">
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
          <a :href="article.link">Read More</a>
        </div>
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
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
            <li><router-link to="/faq">FAQ</router-link></li>
            <li><router-link to="/terms">Terms & Conditions</router-link></li>
            <li><router-link to="/privacy">Privacy Policy</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Connect</h3>
          <ul class="social-links">
            <li>
              <a href="#"><i class="fab fa-instagram"></i> Instagram</a>
            </li>
            <li>
              <a href="#"><i class="fab fa-facebook-f"></i> Facebook</a>
            </li>
            <li>
              <a href="#"><i class="fab fa-youtube"></i> YouTube</a>
            </li>
            <li>
              <a href="#"><i class="fab fa-twitter"></i> Twitter</a>
            </li>
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
  name: "AticlesView",
  data() {
    return {
      articles: [
        {
          id: 1,
          title: "I’m a Health Nut — I Picked the 26 Best Gifts to Give Your Fitness-Obsessed Loved Ones",
          description: "Check out a health journalist’s picks for the 28 best gifts to give your fitness-loving friends and family. By Brittany Vargas February 04, 2025",
          link: "https://www.everydayhealth.com/fitness/fitness-gift-guide/"
        },
        {
          id: 2,
          title: "Walking Backwards: Should You Try This Workout Trend?",
          description: "Walking backwards can improve balance, strengthen your legs and core, and even stimulate your brain. Learn how to walk backwards safely.",
          link: "https://www.everydayhealth.com/fitness/walking-backwards-health-benefits-safety-tips/"
        },
        {
          id: 3,
          title: "37 Black Friday and Cyber Monday Fitness Deals Our Editors Are Shopping This Holiday Season",
          description: "Check out our picks for Black Friday and Cyber Monday Deals and save big on fitness equipment, apparel, accessories, and more.",
          link: "https://www.everydayhealth.com/fitness/black-friday-and-cyber-monday-fitness-deals/"
        },
        {
          id: 4,
          title: "Pvolve Is the Workout I Didn’t Know That I Needed",
          description: "Pvolve is an exercise method that builds functional fitness. Read why an Everyday Health editor with 15 years of fitness experience recommends Pvolve to every woman.",
          link: "https://www.everydayhealth.com/fitness/pvolve-review/"
        }
      ]
    };
  }
};
</script>

<style scoped>
#body {
  font-family: "Poppins", sans-serif;
  background-color: #333;
  color: white;
  margin: 0;
}

header {
  background: #333;
  padding: 15px 30px;
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
  color: crimson;
  letter-spacing: 1px;
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

.container {
  max-width: 1200px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: left;
  margin-bottom: 20px;
  color: white;
}

.articles {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.article-card {
  background: linear-gradient(145deg, white, white);
  border: 1px solid crimson;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  height: auto;
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-card h2 {
  margin: 0 0 12px 0;
  color: crimson;
}

.article-card p {
  font-size: 1.1em;
  color: black;
  margin-bottom: 15px;
  line-height: 1.6;
}

.article-card a {
  text-decoration: none;
  color: crimson;
  font-weight: bold;
  transition: color 0.3s ease;
}

.article-card a:hover {
  text-decoration: underline;
  color: #ff4c4c;
}

.footer {
  background: #333;
  color: white;
  padding: 50px 20px;
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
  color: crimson;
}

.footer-section p {
  font-size: 1em;
  line-height: 1.6;
  color: #d3d3d3;
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
  font-size: 1.2em;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: crimson;
}

.social-links {
  display: flex;
  gap: 12px;
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
  color: crimson;
}

.footer-bottom {
  text-align: center;
  font-size: 1em;
  margin-top: 20px;
  color: #d3d3d3;
}
</style>