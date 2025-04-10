import express from "express";
import {getAllSubscriptionsCon, getSubscriptionByIdCon, addSubscriptionCon, deleteSubscriptionCon, updateSubscriptionCon} from "../controls/subscriptionController.js";

const router = express.Router();

router.get("/", getAllSubscriptionsCon);

router.get("/:subscription_id", getSubscriptionByIdCon);

router.post("/", addSubscriptionCon);

router.delete("/:subscription_id", deleteSubscriptionCon);

router.patch("/:subscription_id", updateSubscriptionCon);

export default router;