import express from "express";
import {getAllBookingsCon, getBookingByIdCon, addBookingCon, deleteBookingCon, updateBookingCon} from "../controls/bookingsController.js";

const router = express.Router();

router.get("/", getAllBookingsCon);

router.get("/:booking_id", getBookingByIdCon);

router.post("/", addBookingCon);

router.delete("/:booking_id", deleteBookingCon);

router.patch("/:booking_id", updateBookingCon);

export default router;