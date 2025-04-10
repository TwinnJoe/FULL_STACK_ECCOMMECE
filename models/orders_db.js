import {pool} from "../config/config.js";

const getAllOrders = async () => {
    let [data] = await pool.query("SELECT * FROM orders");
    return data
}


const getOrderById = async (order_id) => {
    let [data] = await pool.query("SELECT * FROM orders WHERE order_id = ?", [order_id]);
    return data
}


// const getOrderByUserId = async (user_id) => {
//     let [data] = await pool.query("SELECT * FROM orders WHERE user_id = ?", [user_id]);
//     return data
// }


// const getOrderByOrderDate = async (order_date) => {
//     let [data] = await pool.query("SELECT * FROM orders WHERE order_date = ?", [order_date]);
//     return data
// }


const addOrder = async ({user_id,order_date,total_amount,product_status,subscription_status}) => {
    await pool.query("INSERT INTO orders (user_id,order_date,total_amount,product_status,subscription_status) VALUES (?,?,?,?,?)", [user_id,order_date,total_amount,product_status,subscription_status]);
}


const deleteOrder = async (order_id) => {
    await pool.query("DELETE FROM orders WHERE order_id = ?", [order_id]);
}


const updateOrder = async (order_id,{user_id,order_date,total_amount,product_status,subscription_status}) => {
    await pool.query("UPDATE orders SET user_id = ?,order_date = ?,total_amount = ?,product_status = ?,subscription_status = ? WHERE order_id = ?", [user_id,order_date,total_amount,product_status,subscription_status,order_id]);
}

export {getAllOrders, getOrderById, addOrder, deleteOrder, updateOrder}
