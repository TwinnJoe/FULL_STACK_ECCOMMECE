import {getAllPersonalTrainers,getPersonalTrainerById,addPersonalTrainer,deletePersonalTrainer,updatePersonalTrainer} from "../models/personalTrainers_db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const loginPersonalTrainerCon = async (req, res) => {
  try {
    const { username, password } = req.body;
    const trainer = await getPersonalTrainerByUsername(username);

    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    const isMatch = await bcrypt.compare(password, trainer.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { trainer_id: trainer.id, username: trainer.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login error" });
  }
};

// Middleware 
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Access denied, no token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.trainer = decoded;
    next();
  });
};

const getAllPersonalTrainersCon = async (req, res) => {
  try {
    res.status(200).json(await getAllPersonalTrainers());
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was an error while getting all personal trainers",
    });
  }
};

const getPersonalTrainerByIdCon = async (req, res) => {
  try {
    res.status(200).json(await getPersonalTrainerById(req.params.trainer_id));
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was an error while getting personal trainer by id",
    });
  }
};

const addPersonalTrainerCon = async (req, res) => {
  try {
    const { password, ...trainerData } = req.body;
    if (password) {
      const hash_word = await bcrypt.hash(password, 10);
      await addPersonalTrainer({ ...trainerData, password: hash_word });
    } else {
      await addPersonalTrainer(trainerData);
    }

    res.status(200).json({
      message: "Personal trainer added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was an error while adding personal trainer",
    });
  }
};

const deletePersonalTrainerCon = async (req, res) => {
  try {
    await deletePersonalTrainer(req.params.trainer_id);
    res.status(200).json({
      message: "Personal trainer deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was an error while deleting personal trainer",
    });
  }
};

const updatePersonalTrainerCon = async (req, res) => {
  try {
    const { password, ...trainerData } = req.body;
    if (password) {
      const hash_word = await bcrypt.hash(password, 10);
      await updatePersonalTrainer(req.params.trainer_id, {
        ...trainerData,
        password: hash_word,
      });
    } else {
      await updatePersonalTrainer(req.params.trainer_id, trainerData);
    }

    res.status(200).json({
      message: "Personal trainer updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was an error while updating personal trainer",
    });
  }
};

export {loginPersonalTrainerCon,authenticateToken,getAllPersonalTrainersCon,getPersonalTrainerByIdCon,addPersonalTrainerCon,deletePersonalTrainerCon,updatePersonalTrainerCon,};