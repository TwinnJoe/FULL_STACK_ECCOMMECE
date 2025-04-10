import express from "express";
import {getAllAdminCon, getAdminByIdCon, addAdminCon, deleteAdminCon, updateAdminCon} from "../controls/adminController.js";

const router = express.Router();

router.get("/", getAllAdminCon);

router.get("/:admin_id", getAdminByIdCon);

router.post("/", addAdminCon);

router.delete("/:admin_id", deleteAdminCon);

router.patch("/:admin_id", updateAdminCon);

// router.patch("/password/:admin_id", updateAdminPasswordCon);

// router.patch("/email/:admin_id", updateAdminEmailCon);

export default router;