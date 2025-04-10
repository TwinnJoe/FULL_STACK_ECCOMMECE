<template>
    <TrainerDetails />
    <div id="body">
        <header>
            <div class="navbar-left">
                <img src="/images/logo.png" alt="logo" id="logo" />
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
                <button class="login-btn" @click="Login">Log In</button>
            </div>
        </header>

        <div class="container">
            <div class="hero">
                <div class="hero-text">
                    <h1>Your Complete Fitness Solution</h1>
                    <p>All from the comfort of your home!</p>
                    <button @click="Login">Subscribe Now</button>
                </div>
            </div>
            <div class="categories">
                <div class="category">
                    <img src="https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/Categories/category-gym%20equipment.jpg?raw=true"
                        alt="Equipment Image" />
                    <h2>Gym Equipment</h2>
                    <p>Professional-grade fitness equipment</p>
                </div>
                <div class="category">
                    <img src="https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/Categories/category-apparl.jpg?raw=true"
                        alt="Apparel Image" />
                    <h2>Gym Apparel</h2>
                    <p>Performance workout clothing</p>
                </div>
                <div class="category">
                    <img src="https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/Categories/acccesories_category.jpg?raw=true"
                        alt="Accessories Image" />
                    <h2>Accessories</h2>
                    <p>There's something new every month</p>
                </div>
                <div class="category">
                    <img src="https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/Categories/category-training.jpg?raw=true"
                        alt="Training Image" />
                    <h2>Personal Training</h2>
                    <p>Expert fitness guidance</p>
                </div>
            </div>
            <h2 class="title">Featured Products</h2>
            <div v-if="isLoading">
                <p>Loading...</p>
            </div>
            <div v-else class="featured-products">

                <div class="product" v-for="product in products.slice(0, 4)" :key="product.name">
                    <img :src="product.image_url.images[0]" alt="Product Image" />
                    <h3>{{ product.name }}</h3>
                    <p>R{{ product.price }}</p>
                    <button @click="Login">Buy Now</button>
                </div>

            </div>
            <h2 class="trainers">Meet Our Trainers</h2>
        </div>

        <div class="wrapper">
            <div class="card" v-for="trainer in trainers" :key="trainer.trainer_id"> <img :src="trainer.image_url"
                    :alt="trainer.name" @click="openModal(trainer)" /> </div>
        </div>

        <TrainerDetails v-if="selectedTrainer" :trainer="selectedTrainer" :isVisible="isModalVisible"
            @close="closeModal" />


        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h2>PrimeFit</h2>
                    <p>Your complete fitness solution for equipment, apparel, rentals, and training.</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
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
import TrainerDetails from '@/components/TrainerDetails.vue';
import { mapState, mapActions } from 'vuex'; // Import mapState and mapActions from vuex

export default {
    name: "HomeView",
    components: {
        TrainerDetails,
    },
    data() {
        return {
            selectedTrainer: null,
            isModalVisible: false,
            isLoading: true,  // Add loading state
        };
    },
    computed: {
        // Use mapState to connect Vuex state to computed properties
        // products() { // Computed property 'products' that maps to 'store' state from Vuex
        //     return this.$store.state.store;
        // },
        // trainers() { // Computed property 'trainers' that maps to 'personalTrainers' state from Vuex
        //     return this.$store.state.personalTrainers;
        // }
        // You could also use mapState like this for more conciseness:
        ...mapState({
            products: state => state.store,
            trainers: state => state.personalTrainers
        })
    },
    methods: {
        // Use mapActions to map Vuex actions to component methods (optional, but cleaner)
        ...mapActions(['getProducts', 'getPersonalTrainers']), // Map your Vuex actions

        openModal(trainer) {
            this.selectedTrainer = trainer;
            this.isModalVisible = true;
        },
        closeModal() {
            this.selectedTrainer = null;
            this.isModalVisible = false;
        },
        Login() {
            this.$router.push("/login");
        },
    },
    mounted() {
        // Dispatch Vuex actions when the component is mounted to fetch data
        this.getProducts(); // Dispatch the 'getProducts' action to fetch product data
        this.getPersonalTrainers();
        this.isLoading = false; // Dispatch the 'getPersonalTrainers' action to fetch trainer data

        console.log("Products data in home.vue:", this.products);
        console.log("Trainers data in home.vue:", this.trainers);
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

.title {
    margin-left: 40px;
    color: white;
}

.trainers {
    margin-left: 40px;
    color: white;
}

header {
    background-color: #333;
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
    color: white;
    align-items: center;
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
    border-radius: 8px;
}

.hero {
    width: 100%;
    height: 100vh;
    background-image: url("https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/Displays/home-hero.jpg?raw=true");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: left;
    border: 2px solid crimson;
    object-fit: contain;
    color: white;
    border-radius: 20px;
    text-align: left;
}

.hero .hero-text {
    max-width: 50%;
    margin-left: 20px;
    text-align: left;
}

.hero h1 {
    margin: 0;
    font-size: 2.5em;
    font-weight: bold;
}

.hero p {
    font-size: 1.2em;
    margin-top: 10px;
}

.hero button {
    padding: 10px 20px;
    font-size: 1em;
    background-color: crimson;
    color: white;
    margin-top: 10px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
}

.categories,
.featured-products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    width: 100%;
    color: white;
    height: fit-content;
    padding: 20px;
    margin: 0 auto;
    clear: both;
}

.category {
    background-color: #333;
    padding: 20px;
    border-radius: 5px;
    text-align: left;
    width: fit-content;
    margin-bottom: 70px;
    transition: transform 0.3s ease;
}

.product {
    background-color: #333;
    padding: 20px;
    border-radius: 5px;
    text-align: left;
    width: fit-content;
    height: fit-content;
    transition: transform 0.3s ease;
}

.category img,
.product img {
    border-radius: 10px;
    width: 100%;
    height: auto;
    border: 2px solid crimson;
    object-fit: cover;
    display: block;
}

.wrapper {
    max-width: 1200px;
    margin: 20px auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    justify-content: center;
}

.card {
    background: white;
    border-radius: 10px;
    margin: 20px;
    border: 2px solid crimson;
    text-align: center;
}

.card img {
    border-radius: 10px;
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
    margin: 0 auto;
}

/* Lift effect on hover */
.category:hover,
.product:hover,
.card:hover {
    transform: translateY(10px);
}

.category img,
.product img {
    width: 100%;
    height: 100%;
    background-color: #ccc;
    margin-bottom: 10px;
}

.product button {
    padding: 8px 15px;
    background-color: crimson;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;
    margin-top: 5px;
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
    color: crimson;
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

/* Responsive Styles */
@media (max-width: 1200px) {
    .hero .hero-text {
        max-width: 70%;
    }

    .hero h1 {
        font-size: 2em;
    }

    .hero p {
        font-size: 1em;
    }

    .navbar-right button {
        font-size: 1em;
    }

    .footer-section {
        margin-right: 10px;
    }
}

@media (max-width: 768px) {
    header {
        flex-direction: column;
        align-items: flex-start;
    }

    .navbar-left {
        margin-bottom: 10px;
    }

    .hero {
        height: 60vh;
    }

    .hero .hero-text {
        max-width: 100%;
        margin-left: 0;
    }

    .hero h1 {
        font-size: 1.5em;
    }

    .hero p {
        font-size: 0.9em;
    }

    .categories,
    .featured-products {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }

    .category,
    .product {
        margin-bottom: 40px;
    }

    .footer-content {
        flex-direction: column;
        align-items: flex-start;
    }

    .footer-section {
        margin-right: 0;
        margin-bottom: 20px;
    }
}

@media (max-width: 480px) {
    .hero h1 {
        font-size: 1.2em;
    }

    .hero p {
        font-size: 0.8em;
    }

    .hero button {
        padding: 8px 15px;
        font-size: 0.9em;
    }

    .navbar-right button {
        font-size: 0.9em;
    }

    .footer-section h2,
    .footer-section h3 {
        font-size: 1.4em;
    }

    .footer-section p {
        font-size: 0.9em;
    }

    .footer-section ul li a {
        font-size: 1em;
    }

    .social-links li i {
        font-size: 1.2em;
    }
}
</style>