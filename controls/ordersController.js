import {getAllOrders, getOrderById, addOrder, deleteOrder, updateOrder} from "../models/orders_db.js";

const getAllOrdersCon = async (req, res) => {
    try {
        res.status(200).json(await getAllOrders());
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting all orders"
        });
    }
}

const getOrderByIdCon = async (req, res) => {
    try {
        res.status(200).json(await getOrderById(req.params.order_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting order by id"
        });
    }
}

// const getOrderByUserIdCon = async (req, res) => {
//     try {
//         await getOrderByUserId(req.params.user_id)
//         res.status(200).json({
//             message:"Successfully got order by user id"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting order by user id"
//         });
//     }
// }

// const getOrderByOrderDateCon = async (req, res) => {
//     try {
//         await getOrderByOrderDate(req.params.order_date);
//         res.json({
//             message:"Successfully got order by order date"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting order by order date"
//         });
//     }
// }

const addOrderCon = async (req, res) => {
    try {
        await addOrder(req.body);
        res.status(200).json({
            message:"Order added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding order"
        });
    }
}

const deleteOrderCon = async (req, res) => {
    try {
        await deleteOrder(req.params.order_id);
        res.status(200).json({
            message:"Order deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting order"
        });
    }
}

const updateOrderCon = async (req, res) => {
    try {
        await updateOrder(req.params.order_id, req.body);
        res.status(200).json({
            message:"Order updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating order"
        });
    }
}

export {getAllOrdersCon, getOrderByIdCon, addOrderCon, deleteOrderCon, updateOrderCon}; 
