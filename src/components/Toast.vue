<!-- src/components/Toast.vue -->
<template>
    <div v-if="visible" class="toast" :class="type" @click="hideToast">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name:"ToastView",
    data() {
      return {
        visible: false,
        message: '',
        type: 'success', // default type
      };
    },
    methods: {
      showToast(message, type = 'success') {
        this.message = message;
        this.type = type;
        this.visible = true;
  
        setTimeout(() => {
          this.visible = false;
        }, 3000); // Hide after 3 seconds
      },
      hideToast() {
        this.visible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    z-index: 1000;
    transition: opacity 0.5s;
  }
  
  .toast.success {
    background-color: #4caf50; /* Green */
  }
  
  .toast.error {
    background-color: crimson; /* Red */
  }
  
  .toast p {
    margin: 0;
  }
  </style>