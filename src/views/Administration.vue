<template>
    <div id="body">
      <header>
        <div class="navbar-left">
          <img src="/images/logo.png" alt="logo" id="logo" />
          <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/shop">Shop</router-link>
            <router-link to="/admin">Admin</router-link>
          </nav>
        </div>
        <div class="navbar-right">
          <button class="login-btn" @click="login">Log In</button>
        </div>
      </header>
  
      <div class="container">
        <h2 class="title">Manage Products & Orders</h2>
        <div class="form-container">
          <!-- Add/Edit Product Form -->
          <form @submit.prevent="saveProduct" class="form">
            <h3>Product Management</h3>
            <div class="form-group">
              <label for="productName">Product Name:</label>
              <input type="text" id="productName" v-model="productForm.name" required />
            </div>
            <div class="form-group">
              <label for="productDescription">Description:</label>
              <textarea id="productDescription" v-model="productForm.description" required></textarea>
            </div>
            <div class="form-group">
              <label for="productPrice">Price:</label>
              <input type="number" id="productPrice" v-model="productForm.price" required />
            </div>
            <div class="form-group">
              <label for="productCategory">Category:</label>
              <input type="text" id="productCategory" v-model="productForm.category" required />
            </div>
            <div class="form-group">
              <label for="productStock">Stock:</label>
              <input type="number" id="productStock" v-model="productForm.stock" required />
            </div>
            <div class="form-group">
              <label for="productSupplier">Supplier:</label>
              <input type="text" id="productSupplier" v-model="productForm.supplier" required />
            </div>
            <div class="form-group">
              <label for="productImageUrl">Image URL:</label>
              <input type="url" id="productImageUrl" v-model="productForm.image_url" required />
            </div>
            <button type="submit">{{ productForm.id ? 'Update Product' : 'Add Product' }}</button>
          </form>
  
          <!-- Order Status Update Form -->
          <form @submit.prevent="updateOrderStatus" class="form">
            <h3>Order Management</h3>
            <div class="form-group">
              <label for="orderId">Order ID:</label>
              <input type="number" id="orderId" v-model="orderForm.id" required />
            </div>
            <div class="form-group">
              <label for="orderStatus">Status:</label>
              <select id="orderStatus" v-model="orderForm.status" required>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <button type="submit">Update Order Status</button>
          </form>
        </div>
  
        <div class="product-list">
          <div class="product" v-for="product in products" :key="product.id">
            <img :src="product.image_url" alt="Product Image" />
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <p class="price">{{ product.price }}</p>
            <p class="category">{{ product.category }}</p>
            <p class="stock">Stock: {{ product.stock }}</p>
            <p class="supplier">Supplier: {{ product.supplier }}</p>
            <button @click="editProduct(product)">Edit</button>
            <button @click="deleteProduct(product.id)">Delete</button>
          </div>
        </div>
  
        <h2 class="title">Manage Orders</h2>
        <div class="order-list">
          <div class="order" v-for="order in orders" :key="order.id">
            <p>Order ID: {{ order.id }}</p>
            <p>Customer: {{ order.customerName }}</p>
            <p>Products: {{ order.products.join(', ') }}</p>
            <p>Total: {{ order.total }}</p>
            <button @click="updateOrderStatus(order)">Update Status</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminView",
    data() {
      return {
        productForm: {
          id: null,
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '', // Stock field
          supplier: '', // Supplier field
          image_url: '', // New image_url field
        },
        orderForm: {
          id: null,
          status: 'Pending',
        },
        products: [],
        orders: [],
      };
    },
    methods: {
      saveProduct() {
        if (this.productForm.id) {
          this.updateProduct(this.productForm);
        } else {
          this.addProduct(this.productForm);
        }
        this.resetProductForm();
      },
      resetProductForm() {
        this.productForm = {
          id: null,
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '', // Reset stock field
          supplier: '', // Reset supplier field
          image_url: '', // Reset image_url field
        };
      },
      addProduct(product) {
        this.products.push({ ...product, id: Date.now() });
      },
      editProduct(product) {
        this.productForm = { ...product };
      },
      updateProduct(product) {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products.splice(index, 1, product);
        }
      },
      deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
      },
      updateOrderStatus() {
        const order = this.orders.find(order => order.id === this.orderForm.id);
        if (order) {
          order.status = this.orderForm.status;
        }
        this.resetOrderForm();
      },
      resetOrderForm() {
        this.orderForm = {
          id: null,
          status: 'Pending',
        };
      },
      login() {
        // Handle login logic
      }
    },
  };
  </script>
  
  <style scoped>
  #body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #2c2c2c;
    margin: 0;
    padding: 0;
  }
  
  .title {
    color: #f0f0f0;
    font-size: 2.5em;
    margin-bottom: 20px;
    text-align: center;
  }
  
  header {
    background-color: #1a1a1a;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }
  
  #logo {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .navbar-left {
    display: flex;
    align-items: center;
  }
  
  nav {
    margin-left: 30px;
  }
  
  nav a {
    margin: 0 20px;
    padding: 10px 15px;
    text-decoration: none;
    color: #f0f0f0;
    border-radius: 25px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  nav a:hover {
    background-color: #f0f0f0;
    color: #1a1a1a;
  }
  
  .navbar-right {
    display: flex;
    align-items: center;
  }
  
  .navbar-right button {
    margin-left: 15px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1em;
  }
  
  .navbar-right .login-btn {
    background-color: #e63946;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .navbar-right .login-btn:hover {
    background-color: #d62839;
  }
  
  .container {
    max-width: 1200px;
    margin: 30px auto;
    background-color: #3a3a3a;
    border-radius: 10px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }
  
  .form-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  
  .form {
    flex: 1;
    margin: 0 10px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
  }
  
  .form h3 {
    margin-top: 0;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  form label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  form input,
  form select,
  form textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    transition: border-color 0.3s ease;
  }
  
  form input:focus,
  form select:focus,
  form textarea:focus {
    border-color: #e63946;
    outline: none;
  }
  
  form button {
    background-color: #e63946;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
  }
  
  form button:hover {
    background-color: #1a1a1a;
    color: white;
    border: 1px solid #e63946;
  }
  
  .product-list,
  .order-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .product,
  .order {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    color: #333;
    border: 2px solid #e63946;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .product:hover,
  .order:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
  
  .product img {
    border-radius: 10px;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .product .price {
    font-weight: bold;
    color: #e63946;
  }
  
  .product .category,
  .product .stock,
  .product .supplier {
    font-weight: bold;
    font-size: 120%;
  }
  
  .product button,
  .order button {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #e63946;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
  }
  
  .product button:hover,
  .order button:hover {
    background-color: #1a1a1a;
    color: white;
    border: 1px solid #e63946;
  }
  </style>