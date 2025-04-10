<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <img :src="trainer.image_url" :alt="trainer.name" />
        <h3>{{ trainer.name }}</h3>
        <p>{{ trainer.specialization }}</p>
        <button @click="Tutorials">View More</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TrainerDetailsView",
    props: {
      trainer: Object,
      isVisible: Boolean,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      Tutorials() {
        this.$router.push('/trainers');
      },
    },
  };
  </script>
  
  <style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
  transition: opacity 0.3s ease;
}

.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-content img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 15px;
}

.modal-content h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.modal-content p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.modal-content button {
  background-color: crimson; 
  color: #333;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-content button:hover {
  background-color: #333;
  color: white; 
}

.close {
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 10px;
  right: 15px;
  color: white;
  transition: color 0.3s ease;
}

.close:hover {
  color: red; 
}
</style>
