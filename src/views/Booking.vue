<template>
<div id="body">
        <div class="container">
            <h1>Book Your Class</h1>
            <p class="subtitle">Choose from our wide range of fitness classes</p>

            <div class="booking-wrapper">
                <div class="filters">
                    <h2>Filters</h2>
                    <label for="date">Date</label>
                    <input type="date" id="date" v-model="date" />

                    <label for="classType">Class Type</label>
                    <select id="classType" v-model="classType">
                        <option value="all">All Classes</option>
                        <option value="hiit">HIIT Workout</option>
                        <option value="yoga">Yoga Flow</option>
                        <option value="strength">Strength Training</option>
                    </select>

                    <label for="trainer">Trainer</label>
                    <select id="trainer" v-model="trainer">
                        <option value="any">Any Trainer</option>
                        <option value="john">John Smith</option>
                        <option value="sarah">Sarah Johnson</option>
                        <option value="mike">Mike Wilson</option>
                    </select>

                    <label for="time">Time</label>
                    <select id="time" v-model="time">
                        <option value="any">Any Time</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                    </select>
                </div>

                <div class="class-list">
                    <div v-if="isLoadingBookings">
                        <p>Loading classes...</p>
                    </div>
                    <div v-else-if="bookingError">
                        <p class="error-message">Error: {{ bookingError }}</p>
                    </div>
                    <div v-else>
                        <div class="class-card" v-for="classInfo in filteredClasses" :key="classInfo.booking_id">
                            <div class="class-info">
                                <h3>{{ classInfo.name }}</h3>
                                <p class="trainer">with {{ classInfo.trainer_id }}</p>
                                <p class="spots">👥 {{ classInfo.status }} spots left</p>
                            </div>
                            <div class="class-time">
                                <p class="time">{{ classInfo.session_time }}</p>
                                <p class="duration">{{ classInfo.duration }} mins</p>
                                <button class="book-btn" @click="bookClass(classInfo)" :disabled="isAddingBooking">
                                    Book Now <span v-if="isAddingBooking"> (Booking...)</span>
                                </button>
                                <button class="cancel-btn" @click.stop="handleCancelBooking(classInfo.booking_id)" :disabled="isDeletingBooking">
                                    Cancel <span v-if="isDeletingBooking"> (Canceling...)</span>
                                </button>
                                <button class="edit-btn" @click.stop="openEditBookingModal(classInfo)" :disabled="isUpdatingBooking">
                                    Edit <span v-if="isUpdatingBooking"> (Updating...)</span>
                                </button>
                            </div>
                            <p v-if="deleteBookingError" class="error-message">{{ deleteBookingError }}</p>
                        </div>
                        <div v-if="filteredClasses.length === 0 && !isLoadingBookings && !bookingError">
                            <p>No classes match your filters.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="isAddBookingModalVisible" class="modal">
                <div class="modal-content">
                    <span class="close-button" @click="closeAddBookingModal">&times;</span>
                    <h2>Add New Booking</h2>
                    <div v-if="addBookingError" class="error-message">{{ addBookingError }}</div>
                    <form @submit.prevent="handleAddBookingSubmit">
                        <label for="user_id">User ID</label>
                        <input type="text" id="user_id" v-model.number="newBooking.user_id" required />

                        <label for="trainer_id">Trainer ID</label>
                        <input type="text" id="trainer_id" v-model.number="newBooking.trainer_id" required />

                        <label for="session_date">Session Date</label>
                        <input type="date" id="session_date" v-model="newBooking.session_date" required />

                        <label for="session_time">Session Time</label>
                        <input type="time" id="session_time" v-model="newBooking.session_time" required />

                        <button type="submit" :disabled="isAddingBooking">
                            Add Booking <span v-if="isAddingBooking"> (Adding...)</span>
                        </button>
                    </form>
                </div>
            </div>

            <div v-if="isEditBookingModalVisible" class="modal">
                <div class="modal-content">
                    <span class="close-button" @click="closeEditBookingModal">&times;</span>
                    <h2>Edit Booking</h2>
                    <div v-if="updateBookingError" class="error-message">{{ updateBookingError }}</div>
                    <form @submit.prevent="handleUpdateBookingSubmit">
                        <label for="edit_user_id">User ID</label>
                        <input type="text" id="edit_user_id" v-model.number="editingBooking.user_id" required />

                        <label for="edit_trainer_id">Trainer ID</label>
                        <input type="text" id="edit_trainer_id" v-model.number="editingBooking.trainer_id" required />

                        <label for="edit_session_date">Session Date</label>
                        <input type="date" id="edit_session_date" v-model="editingBooking.session_date" required />

                        <label for="edit_session_time">Session Time</label>
                        <input type="time" id="edit_session_time" v-model="editingBooking.session_time" required />

                        <label for="edit_status">Status</label>
                        <select id="edit_status" v-model="editingBooking.status">
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>

                        <button type="submit" :disabled="isUpdatingBooking">
                            Update Booking <span v-if="isUpdatingBooking"> (Updating...)</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "BookingView",
    data() {
        return {
            date: "",
            classType: "all",
            trainer: "any",
            time: "any",
            isAddBookingModalVisible: false,
                    newBooking: {
                        user_id: '', 
                        trainer_id: '',
                        session_date: '',
                        session_time: '',
                    },
                    
                    isEditBookingModalVisible: false,
                    editingBooking: {
                        booking_id: null,
                        user_id: '',
                        trainer_id: '',
                        session_date: '',
                        session_time: '',
                        status: 'pending' 
                    },
        };
    },
    computed: {
        ...mapState(['bookings', 'isLoadingBookings', 'bookingError',
            'isAddingBooking', 'addBookingError',
            'isUpdatingBooking', 'updateBookingError',
            'isDeletingBooking', 'deleteBookingError']), 
        
        filteredClasses() {
            if (!this.bookings) { 
                return [];
            }
            return this.bookings.filter((classInfo) => {
                
                if (this.classType !== "all" && classInfo.type !== this.classType) { 
                    return false;
                }
                if (this.trainer !== "any" && classInfo.trainer !== this.trainer) { 
                    return false;
                }
                if (this.time !== "any" && !this.getTimeRange(classInfo.time).includes(this.time)) {
                    return false;
                }
                return true;
            });
        },
    },
    methods: {
      ...mapActions(['getBookings', 'deleteBooking', 'addBooking', 'updateBooking']),
        bookClass(classInfo) {
            console.log(`Booking class: ${classInfo.name} with trainer ID: ${classInfo.trainer_id}`);
            this.openAddBookingModal(classInfo); // Open add booking modal and pass class info
        },
        getTimeRange(time) {
            const timeParts = time.split(" ");
            const hour = parseInt(timeParts[0].split(":")[0]);
            const period = timeParts[1];
            if (period === "AM") {
                return hour < 12 ? ["morning"] : ["afternoon"];
            } else {
                return hour < 6 ? ["afternoon"] : ["evening"];
            }
        },
        handleCancelBooking(bookingId) {
            if (confirm('Are you sure you want to cancel this booking?')) {
                this.deleteBooking(bookingId);
            }
        },
        // --- ADD BOOKING MODAL METHODS ---
        openAddBookingModal(classInfo) {
            // Pre-fill trainer_id and possibly session_date/time from classInfo if available
            this.newBooking = {
                user_id: '1', // Replace '1' with dynamically get current user's ID
                trainer_id: classInfo.trainer_id,
                session_date: this.date || '', // Use selected date filter or leave empty
                session_time: classInfo.session_time, // Or derive from classInfo if applicable
            };
            this.isAddBookingModalVisible = true;
        },
        closeAddBookingModal() {
            this.isAddBookingModalVisible = false;
            this.newBooking = { // Reset form
                user_id: '',
                trainer_id: '',
                session_date: '',
                session_time: '',
            };
        },
        handleAddBookingSubmit() {
            this.addBooking(this.newBooking); // Dispatch addBooking action
            this.closeAddBookingModal(); // Close modal after submission (or on success in action)
        },
        // --- EDIT BOOKING MODAL METHODS ---
        openEditBookingModal(bookingInfo) {
            this.editingBooking = { ...bookingInfo }; // Populate edit form with booking data
            this.isEditBookingModalVisible = true;
        },
        closeEditBookingModal() {
            this.isEditBookingModalVisible = false;
            this.editingBooking = { // Reset edit form
                booking_id: null,
                user_id: '',
                trainer_id: '',
                session_date: '',
                session_time: '',
                status: 'pending'
            };
        },
        handleUpdateBookingSubmit() {
            this.updateBooking({ booking_id: this.editingBooking.booking_id, bookingData: this.editingBooking }); // Dispatch update action
            this.closeEditBookingModal(); // Close modal after submission
        },
    },
    mounted() {
        console.log("BookingView mounted - fetching classes");
        this.getBookings();
    },
};
</script>

<style scoped>
#body {
  font-family: Arial, sans-serif;
  background-color: #333;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  width: 90%;
  max-width: 1000px;
  background: white;
  padding: 30px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(255, 0, 0, 0.2);
}

h1 {
  text-align: left;
  color: #d32f2f;
}

.subtitle {
  text-align: left;
  color: #555;
  margin-bottom: 20px;
}

.booking-wrapper {
  display: flex;
  gap: 20px;
}

.filters {
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #d32f2f;
  height: fit-content;
  width: 30%;
  box-shadow: 0px 2px 10px rgba(255, 0, 0, 0.2);
}

.filters h2 {
  margin-bottom: 15px;
  text-align: left;
}

.filters label {
  display: block;
  font-size: 14px;
  margin-top: 10px;
  font-weight: bold;
  color: #333;
}

.filters input,
.filters select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d32f2f;
  margin-top: 5px;
  font-weight: bold;
  background: white;
  color: #d32f2f;
  transition: border-color 0.3s, background 0.3s;
}

.filters input[type="date"] {
  background: white;
  color: #d32f2f;
  font-weight: bold;
  border: 1px solid #d32f2f;
  margin-top: 5px;
  padding: 10px;
  width: 92%;
  transition: border-color 0.3s, background 0.3s;
}

.filters input:focus,
.filters select:focus {
  border-color: crimson;
  outline: none;
}

.class-list {
  flex: 1;
}

.class-card {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #d32f2f;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(255, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.class-card:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 15px rgba(255, 0, 0, 0.4);
}

.class-card h3 {
  color: #d32f2f;
}

.class-info h3 {
  margin: 0;
  font-size: 18px;
  color: black;
}

.trainer {
  font-size: 14px;
  color: #555;
}

.spots {
  font-size: 14px;
  color: #888;
}

.class-time {
  text-align: right;
}

.class-time .time {
  font-weight: bold;
  font-size: 16px;
  color: #d32f2f;
}

.class-time .duration {
  font-size: 14px;
  color: #666;
}

.book-btn {
  background: #d32f2f;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 5px;
  transition: background 0.3s;
}

.book-btn:hover {
  background: #a50e0e;
}

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
}

.close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close-button:hover,
.close-button:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.modal-content label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
}

.modal-content input[type="text"],
.modal-content input[type="date"],
.modal-content input[type="time"],
.modal-content select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.modal-content button[type="submit"] {
    background-color: #d32f2f;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
}

.modal-content button[type="submit"]:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>