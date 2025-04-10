import {getAllOrderItems, getOrderItemById, addOrderItem, deleteOrderItem, updateOrderItem} from "../models/orderItems_db.js";

const getAllOrderItemsCon = async (req, res) => {
    try {
        res.status(200).json(await getAllOrderItems());
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting all order items"
        });
    }
}

const getOrderItemByIdCon = async (req, res) => {
    try {
        res.status(200).json(await getOrderItemById(req.params.order_item_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting order item by id"
        });
    }
}

const addOrderItemCon = async (req, res) => {
    try {
        await addOrderItem(req.body);
        res.status(200).json({
            message:"Order item added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding order item"
        });
    }
}

const deleteOrderItemCon = async (req, res) => {
    try {
        await deleteOrderItem(req.params.order_item_id,req.body);
        res.status(200).json({
            message:"Order item deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting order item"
        });
    }
}

const updateOrderItemCon = async (req, res) => {
    try {
        await updateOrderItem(req.params.order_item_id, req.body);
        res.status(200).json({
            message:"Order item updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating order item"
        });
    }
}

export {getAllOrderItemsCon, getOrderItemByIdCon, addOrderItemCon, deleteOrderItemCon, updateOrderItemCon};
