import express from "express";
import { getAllUsersCon,getUserByIdCon,addUserCon,deleteUserCon,updateUserDetailsCon} from "../controls/usersController.js";

const router = express.Router();

router.get("/", getAllUsersCon);

// router.get("/subscription/:subscription_type", getUsersBySubscriptionCon);

router.get("/:user_id", getUserByIdCon);

router.post("/", addUserCon);

router.delete("/:user_id", deleteUserCon);

router.patch("/:user_id", updateUserDetailsCon);

// router.patch("/password/:user_id", updateUserPasswordCon);

// router.patch("/email/:user_id", updateUserEmailCon);

export default router;