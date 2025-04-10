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
        <div class="hero">
            <h2>Our Expert Trainers</h2>
            <p>Meet the professionals who will guide you to your fitness goals</p>
        </div>
        <div class="container">
            <div class="card" v-for="trainer in trainers" :key="trainer.trainer_id">  <img :src="trainer.image_url" :alt="trainer.name" />  <h3>{{ trainer.name }}</h3>  <p>💪 Specializes in: {{ trainer.specialization }}</p>  <p>🏅 {{ trainer.experience }} Years Experience</p>  <p>📞 Get in Contact: {{ trainer.email }}</p> <div class="social-icons">
                    <a :href="trainer.instagram" target="_blank">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a :href="trainer.facebook" target="_blank">
                        <i class="fab fa-facebook"></i>
                    </a>
                </div>
                <router-link :to="{ name: 'Tutorials' }">
                    <button class="button">Watch Tutorials</button>
                </router-link>
                <br>
                <br>
                <a class="booking" href="./booking">Book Session</a>
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
                            <a href="#" target="_blank">
                                <i class="fab fa-instagram"></i> Instagram
                            </a>
                        </li>
                        <li>
                            <a href="#" target="_blank">
                                <i class="fab fa-facebook-f"></i> Facebook
                            </a>
                        </li>
                        <li>
                            <a href="#" target="_blank">
                                <i class="fab fa-youtube"></i> YouTube
                            </a>
                        </li>
                        <li>
                            <a href="#" target="_blank">
                                <i class="fab fa-twitter"></i> Twitter
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr />
            <div class="footer-bottom">
                <p> 2025 PrimeFit. All rights reserved.</p>
            </div>
        </footer>
    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'; // Import mapState and mapActions from vuex

export default {
    name: "TrainersView",
    data() {
        return {
            // Remove the static trainers array from data() - we will get trainers from Vuex now
            // trainers: [
            //     {
            //         id: 1,
            //         name: "John Davis",
            //         specialty: "Strength & Conditioning",
            //         experience: 10,
            //         description:
            //             "Specialized in strength training and athletic performance enhancement.",
            //         image: "/images/Trainers/T1.jpeg",
            //         instagram: "#",
            //         facebook: "#",
            //     },
            //     {
            //         id: 2,
            //         name: "Sarah Wilson",
            //         specialty: "Yoga & Pilates",
            //         experience: 8,
            //         description: "Expert in mindful movement and body awareness training.",
            //         image: "/images/Trainers/T2.jpeg",
            //         instagram: "#",
            //         facebook: "#",
            //     },
            //     {
            //         id: 3,
            //         name: "Mike Johnson",
            //         specialty: "CrossFit Expert",
            //         experience: 12,
            //         description: "CrossFit champion and functional training specialist.",
            //         image: "/images/Trainers/T3.jpeg",
            //         instagram: "#",
            //         facebook: "#",
            //     },
            // ],
        };
    },
    computed: {
        // Use mapState to connect Vuex state to computed property 'trainers'
        ...mapState({
            trainers: state => state.personalTrainers // Maps to 'personalTrainers' state in Vuex
        })
    },
    methods: {
        // Use mapActions to map Vuex action 'getPersonalTrainers' to a component method (optional)
        ...mapActions(['getPersonalTrainers']),
    },
    mounted() {
        // Dispatch the Vuex action to fetch trainers when the component is mounted
        this.getPersonalTrainers();
    },
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
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  justify-content: space-between;
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

.hero {
  background-color: #333;
  color: crimson;
  font-weight: bolder;
  font-size: 180%;
  text-align: center;
  padding: 10px;
  height: 400px;
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero h2 {
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.5rem;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
}

.card {
  background: white;
  border: 2px solid crimson;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
}

.card img {
  border-radius: 10px;
  width: 100%;
  height: auto;
  object-fit: cover;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  display: block;
  margin: 0 auto;
}

.social-icons a {
  margin: 0 10px;
  color: #4b5563;
  font-size: 20px;
}

.button {
  background: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.booking {
  background: black;
  color: white;
  padding: 10px 20px;
  border: none;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.booking:hover{
  background: crimson;
  color: black;
}

.button:hover {
  background: crimson;
  color: black;
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