import {pool} from "../config/config.js";

const getAllBookings = async () => {
    let [data] = await pool.query("SELECT * FROM bookings");
    return data
}

const getBookingById = async (booking_id) => {
    let [data] = await pool.query("SELECT * FROM bookings WHERE booking_id = ?", [booking_id]);
    return data
}


// const getBookingsByDate = async (session_date) => {
//     let [data] = await pool.query("SELECT * FROM bookings WHERE session_date = ?", [session_date]);
//     return data
// }


// const getBookingsByTime = async (session_time) => {
//     let [data] = await pool.query("SELECT * FROM bookings WHERE session_time = ?", [session_time]);
//     return data
// }


// const getBookingsByStatus = async (status) => {
//     let [data] = await pool.query("SELECT * FROM bookings WHERE status = ?", [status]);
//     return data
// }


// const getBookingByUserId = async (user_id) => {
//     let [data] = await pool.query("SELECT * FROM bookings WHERE user_id = ?", [user_id]);
//     return data
// }


// const getBookingByTrainerId = async (trainer_id) => {
//     let [data] = await pool.query("SELECT * FROM bookings WHERE trainer_id = ?", [trainer_id]);
//     return data
// }

const addBooking = async ({user_id,trainer_id, session_date, session_time, status}) => {
    await pool.query("INSERT INTO bookings (user_id,trainer_id, session_date, session_time, status) VALUES (?, ?, ?, ?, ?)", [user_id,trainer_id, session_date, session_time, status]);
}

const deleteBooking = async (booking_id) => {
    await pool.query("DELETE FROM bookings WHERE booking_id = ?", [booking_id]);
}

const updateBooking = async (booking_id,{user_id, trainer_id, session_date, session_time, status}) => {
    await pool.query("UPDATE bookings SET user_id = ?, trainer_id = ?, session_date = ?, session_time = ?, status = ? WHERE booking_id = ?", [user_id, trainer_id, session_date, session_time, status, booking_id]);
}

export { getAllBookings, getBookingById, addBooking, deleteBooking, updateBooking }

