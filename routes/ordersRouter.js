import express from "express";
import {getAllOrdersCon, getOrderByIdCon, addOrderCon, deleteOrderCon, updateOrderCon} from "../controls/ordersController.js";

const router = express.Router();

router.get("/", getAllOrdersCon);

router.get("/:order_id", getOrderByIdCon);

router.post("/", addOrderCon);

router.delete("/:order_id", deleteOrderCon);

router.patch("/:order_id", updateOrderCon);

export default router;