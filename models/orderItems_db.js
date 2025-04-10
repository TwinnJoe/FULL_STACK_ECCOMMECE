import {pool} from "../config/config.js";

const getAllOrderItems = async () => {
    let [data] = await pool.query("SELECT * FROM order_items");
    return data
}


const getOrderItemById = async (order_item_id) => {
    let [data] = await pool.query("SELECT * FROM order_items WHERE order_item_id = ?", [order_item_id]);
    return data
}


const addOrderItem = async ({order_id, product_id, subscription_id, quantity, price}) => {
    await pool.query("INSERT INTO order_items (order_id, product_id, subscription_id, quantity, price) VALUES (?,?,?,?,?)", [order_id, product_id, subscription_id, quantity, price]);
}


const deleteOrderItem = async (order_item_id) => {
    await pool.query("DELETE FROM order_items WHERE order_item_id = ?", [order_item_id]);
}


const updateOrderItem = async (order_item_id, {order_id, product_id, subscription_id, quantity, price}) => {
    await pool.query("UPDATE order_items SET order_id = ?, product_id = ?, subscription_id = ?, quantity = ?, price = ? WHERE order_item_id = ?", [order_id, product_id, subscription_id, quantity, price, order_item_id]);
}


export {getAllOrderItems, getOrderItemById, addOrderItem, deleteOrderItem, updateOrderItem}

