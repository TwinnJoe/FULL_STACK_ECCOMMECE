<template>
  <div id="body">
    <div class="container">
    <!-- Login Form -->
    <div id="login-form" class="form-container" :class="{ active: activeForm === 'login' }">
      <h1>Welcome to PrimeFit</h1>
      <p>Your fitness journey starts here</p>

      <div class="toggle-buttons">
        <button id="login-btn" class="toggle-btn" @click="switchForm('login')">
          Login
        </button>
        <button id="register-btn" class="toggle-btn" @click="switchForm('register')">
          Create Account
        </button>
        <div id="slider" class="toggle-slider" :style="{ left: sliderPosition }"></div>
      </div>

      <form @submit.prevent="handleLogin">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="loginEmail" placeholder="your@email.com" required />

        <label for="password">Password</label>
        <input type="password" id="password" v-model="loginPassword" placeholder="********" required />

        <div class="options">
          <label><input type="checkbox" v-model="rememberMe" /> Remember me</label>
          <a href="#" @click.prevent="switchForm('reset')">Forgot password?</a>
        </div>

        <button type="submit" class="sign-in">Sign In</button>
      </form>
      <p class="divider">Or continue with</p>
      <div class="social-buttons">
        <button class="social-btn google">G</button>
        <button class="social-btn apple">A</button>
        <button class="social-btn facebook">F</button>
      </div>
    </div>

    <!-- Register Form -->
    <div id="register-form" class="form-container" :class="{ active: activeForm === 'register' }">
      <h1>Create Account</h1>
      <p>Join PrimeFit today</p>

      <div class="toggle-buttons">
        <button id="login-btn" class="toggle-btn" @click="switchForm('login')">
          Login
        </button>
        <button id="register-btn" class="toggle-btn" @click="switchForm('register')">
          Create Account
        </button>
        <div id="slider" class="toggle-slider" :style="{ left: sliderPosition }"></div>
      </div>

      <form @submit.prevent="handleRegister">
        <label for="register-email">Email</label>
        <input type="email" id="register-email" v-model="registerEmail" placeholder="your@email.com" required />

        <label for="register-password">Password</label>
        <input type="password" id="register-password" v-model="registerPassword" placeholder="********" required />

        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="********" required />

        <button type="submit" class="sign-in">Create Account</button>
      </form>
      <p class="divider">Or sign up with</p>
      <div class="social-buttons">
        <button class="social-btn google">G</button>
        <button class="social-btn apple">A</button>
        <button class="social-btn facebook">F</button>
      </div>
    </div>

    <!-- Reset Password Form -->
    <div id="reset-form" class="form-container" :class="{ active: activeForm === 'reset' }">
      <h1>Reset Password</h1>
      <p>Enter your email to reset your password</p>

      <form @submit.prevent="handleReset">
        <label for="reset-email">Email</label>
        <input type="email" id="reset-email" v-model="resetEmail" placeholder="your@email.com" required />

        <button type="submit" class="sign-in">Send Reset Link</button>
      </form>
      <p class="divider">
        Remembered your password?
        <a href="#" @click.prevent="switchForm('login')">Login</a>
      </p>
    </div>

    <!-- Success Modal -->
    <div id="success-modal" class="modal" v-if="showSuccessModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Welcome to PrimeFit😊</h2>
        <p>Your Form has been successfully submitted.</p>
      </div>
    </div>

    <!-- PrimeFit Membership Form -->
    <div id="membership-form" class="form-container" :class="{ active: activeForm === 'membership' }">
      <h1>PrimeFit Membership</h1>
      <p>Fill in your details</p>

      <form @submit.prevent="handleMembership">
        <label for="full-name">Full Name</label>
        <input type="text" id="full-name" v-model="fullName" placeholder="Name" required />

        <label for="age">Age</label>
        <input type="number" id="age" v-model="age" placeholder="Age" required />

        <label for="gender">Gender</label>
        <select id="gender" v-model="gender" required>
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>

        <label for="phone">Phone Number</label>
        <input type="text" id="phone" v-model="phone" placeholder="123-456-7890" required />

        <button type="submit" class="sign-in">Submit Form</button>
      </form>
      <p class="divider">
        Already have an account?
        <a href="#" @click.prevent="switchForm('login')">Login</a>
      </p>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name:"LoginView",
  data() {
    return {
      activeForm: 'login',
      sliderPosition: '0%',
      loginEmail: '',
      loginPassword: '',
      rememberMe: false,
      registerEmail: '',
      registerPassword: '',
      confirmPassword: '',
      resetEmail: '',
      showSuccessModal: false,
      fullName: '',
      age: '',
      gender: '',
      phone: '',
    };
  },
  methods: {
    switchForm(form) {
      this.activeForm = form;
      if (form === 'login') {
        this.sliderPosition = '0%';
      } else if (form === 'register') {
        this.sliderPosition = '50%';
      } else if (form === 'reset') {
        this.sliderPosition = '100%';
      } else if (form === 'membership') {
        this.sliderPosition = '100%';
      }
    },
    handleLogin() {
      // Handle login logic here
      console.log('Login:', this.loginEmail, this.loginPassword);
    },
    handleRegister() {
      // Handle registration logic here
      console.log('Register:', this.registerEmail, this.registerPassword);
      this.switchForm('membership');
    },
    handleReset() {
      // Handle reset logic here
      console.log('Reset:', this.resetEmail);
    },
    handleMembership() {
      // Handle membership logic here
      console.log('Membership:', this.fullName, this.age, this.gender, this.phone);
      this.showSuccessModal = true;
    },
    closeModal() {
      this.showSuccessModal = false;
    },
  },
};
</script>

<style scoped>
      #body {
        font-family: Arial, sans-serif;
        background-color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
      }

      .container {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        width: 320px;
        text-align: center;
        position: relative;
      }
      select {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border-radius: 5px;
        border: 1px solid #dcdcdc;
        background-color: #f9f9f9;
        appearance: none; 
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'); /* Custom arrow */
        background-repeat: no-repeat;
        background-position: right 10px center; 
      }

      input[type="text"],
      input[type="number"],
      input[type="email"],
      input[type="password"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border-radius: 5px;
        border: 1px solid crimson;
      }

      /* Toggle buttons inside the form */
      .toggle-buttons {
        display: flex;
        position: relative;
        margin-bottom: 20px;
        border-bottom: 2px solid #ddd;
      }

      .toggle-btn {
        flex: 1;
        padding: 10px;
        cursor: pointer;
        font-weight: bold;
        border: none;
        background: none;
        outline: none;
        position: relative;
      }

      /* Underline slider */
      .toggle-slider {
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 50%;
        height: 2px;
        background-color: black;
        transition: 0.3s ease-in-out;
      }

      h1 {
        font-size: 24px;
        margin-bottom: 10px;
      }

      p {
        color: #666;
        margin: 0 0 20px;
      }

      label {
        display: block;
        margin-bottom: 5px;
        text-align: left;
      }

      input[type="email"],
      input[type="password"],
      input[type="text"],
      input[type="number"],
      select {
        box-sizing: border-box; 
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border-radius: 5px;
        border: 1px solid crimson;
      }

      .options {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        margin-bottom: 15px;
      }

      .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
      }

      .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        text-align: center;
      }

      .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }

      .close:hover,
      .close:focus {
        color: red;
        text-decoration: none;
        cursor: pointer;
      }

      .sign-in {
        width: 100%;
        padding: 10px;
        background-color: crimson;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      .social-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }

      .social-btn {
        width: 30%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        color: white;
      }

      .google {
        background-color: #db4437;
      }

      .apple {
        background-color: #000;
      }

      .facebook {
        background-color: #3b5998;
      }

      .divider {
        text-align: center;
        margin: 15px 0;
      }

      a {
        color: #007bff;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      /* Forms */
      .form-container {
        display: none;
      }

      .form-container.active {
        display: block;
      }
    </style>
