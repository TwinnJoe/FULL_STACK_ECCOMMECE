import express from "express";
import {getAllPersonalTrainersCon,getPersonalTrainerByIdCon,addPersonalTrainerCon,deletePersonalTrainerCon,updatePersonalTrainerCon} from "../controls/personalTrainersController.js";

const router = express.Router();

router.get("/", getAllPersonalTrainersCon);

router.get("/:trainer_id", getPersonalTrainerByIdCon);

router.post("/", addPersonalTrainerCon);

router.delete("/:trainer_id", deletePersonalTrainerCon);

router.patch("/:trainer_id", updatePersonalTrainerCon);


export default router;