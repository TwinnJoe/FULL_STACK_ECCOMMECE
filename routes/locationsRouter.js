import express from "express";
import {getAllLocationsCon, getLocationbyIdCon, addLocationCon, deleteLocationCon, updateLocationCon} from "../controls/locationsController.js";

const router = express.Router();

router.get("/", getAllLocationsCon);

router.get("/:location_id", getLocationbyIdCon);

// router.get("/city/:city", getLocationByCityCon);

// router.get("/province/:province", getLocationByProvinceCon);

router.post("/", addLocationCon);

router.delete("/:location_id", deleteLocationCon);

router.patch("/:location_id", updateLocationCon);

export default router;