<template>
  <div id="body">
    <div>
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
    <h1>Watch tutorials</h1>
    <div class="video-cards">
      <div class="card" v-for="(video, index) in videos" :key="index">
        <video controls>
          <source :src="video.src" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h2>{{ video.title }}</h2>
        <p>{{ video.trainer }}</p>
        <p>{{ video.description }}</p>
        <button>Play</button>
      </div>
    </div>
    <button class="back-button" @click="$router.push('/trainers')">
      Go Back to Trainers
    </button>
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
  </div>
</template>
<script>
export default {
name: "TutorialView",
data() {
  return {
    videos: [
      { src: "weightlifting.mp4", title: "Weightlifting Exercises", trainer: "Mark Thomson", description: "A guide to effective weightlifting techniques for building strength and endurance." },
      { src: "trx.mp4", title: "Trx", trainer: "David Johnson", description: "Learn how to use TRX suspension training to enhance your workouts." },
      { src: "ab-machines.mp4", title: "Ab Machines", trainer: "Nick Thompson", description: "Master the use of ab machines to strengthen your core effectively." },
      { src: "ab-machines.mp4", title: "Ab Machines", trainer: "Nick Thompson", description: "Master the use of ab machines to strengthen your core effectively." },
      { src: "ab-machines.mp4", title: "Ab Machines", trainer: "Nick Thompson", description: "Master the use of ab machines to strengthen your core effectively." },
      { src: "ab-machines.mp4", title: "Ab Machines", trainer: "Nick Thompson", description: "Master the use of ab machines to strengthen your core effectively." }
    ]
  };
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
      align-items: center;
      box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
      margin-bottom: 10px;
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
      max-width: 80%;
      margin: auto;
      background: #333;
      padding: 20px;
      border-radius: 8px;
    }
    h1,
    h2 {
      color:white;
    }
    .video-cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .card {
      background: #FAFAFA;
      border: 1px solid #E0E0E0;
      border-radius: 8px;
      width: 30%;
      text-align: center;
      border: 2px solid crimson;
      padding: 10px;
      position: relative;
      margin-bottom: 20px;
    }
    .card video {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgb(220, 20, 60);
      height: 200px;
    }
    button {
      background: black;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
    button:hover {
      background: crimson;
      color: black;
      font-weight: bold;
    }
    .back-button {
      display: block;
      width: 200px;
      background-color: crimson;
      margin: 20px auto;
      text-align: center;
    }
    .footer {
      background-color: #333;
      color: white;
      padding: 40px 20px;
      margin-top: 10px;
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
      color: white;
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
      color: #F39C12;
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











