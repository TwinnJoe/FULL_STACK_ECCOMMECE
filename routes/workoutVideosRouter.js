import express from "express";
import { getAllWorkoutVideosCon, getWorkoutVideosByIdCon, addWorkoutVideoCon, deleteWorkoutVideoCon, updateWorkoutVideoCon } from "../controls/workoutVideosController.js";

const router = express.Router();

router.get("/", getAllWorkoutVideosCon);

router.get("/:video_id", getWorkoutVideosByIdCon);

// router.get("/category/:category", getWorkoutVideosByCategoryCon);

router.post("/", addWorkoutVideoCon);

router.delete("/:video_id", deleteWorkoutVideoCon);

router.patch("/:video_id", updateWorkoutVideoCon);

export default router;