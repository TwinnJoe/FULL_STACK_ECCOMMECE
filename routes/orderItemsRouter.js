import express from "express";
import {getAllOrderItemsCon, getOrderItemByIdCon, addOrderItemCon, deleteOrderItemCon, updateOrderItemCon} from "../controls/orderItemsController.js";

const router = express.Router();

router.get("/", getAllOrderItemsCon);

router.get("/:order_item_id", getOrderItemByIdCon);

router.post("/", addOrderItemCon);

router.delete("/:order_item_id", deleteOrderItemCon);

router.patch("/:order_item_id", updateOrderItemCon);

export default router;