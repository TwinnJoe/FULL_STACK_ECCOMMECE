import {getAllUsers,getUserById,addUser,deleteUser,updateUserDetails} from "../models/users_db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const loginUserCon = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await getUserByUsername(username); // Assuming you have getUserByUsername in user_db.js
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      const token = jwt.sign(
        { user_id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "There was an error during login" });
    }
  };
  
  // Middleware
  const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "Access denied, no token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }
      req.user = decoded; // Changed req.admin to req.user
      next();
    });
  };

const getAllUsersCon = async (req,res) => {
    try {
        res.status(200).json(await getAllUsers());
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting all users"
        })
    }
}

// const getUsersBySubscriptionCon = async (req,res) => {
//     try {
//         await getUsersBySubscription(req.params.subscription_type);
//         res.status(200).json({
//             message:"Users found successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting users by subscription"
//         })
//     }
// }

const getUserByIdCon = async (req,res) => {
    try {
        res.status(200).json(await getUserById(req.params.user_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting user"
        })
    }
}


const addUserCon = async (req,res) => {
    try {  const { password, ...usersData } = req.body; 
    const hash_word = await bcrypt.hash(password, 10);
    await addUser({ ...usersData, password: hash_word });
       res.status(200).json({
        message:"User added successfully"
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding user"
        })
    }
}


const deleteUserCon = async (req,res) => {
    try {
        await deleteUser(req.params.user_id);
        res.status(200).json({
            message:"User deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting user"
        })
    }
}


const updateUserDetailsCon = async (req, res) => {
    try {
      const { password, ...usersData } = req.body;
      if (password) {
        const hash_word = await bcrypt.hash(password, 10);
        await updateUserDetails(req.params.user_id, { 
          ...usersData, 
          password: hash_word,
        });
      } else {
        await updateUserDetails(req.params.user_id, usersData); 
      }
      res.status(200).json({
        message: "User details updated successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "There was an error while updating user details",
      });
    }
  };


// const updateUserPasswordCon = async (req,res) => {
//     let {user_id,password} = req.body;
//     try {
//         await updateUserPassword(user_id,password);
//     res.satus(200).json({
//         message:"User password updated successfully"
//         });
//     } catch (err) {
//     console.error(err);
//     res.status(500).json({
//         error:"There was an error while updating user password"
//         })
//     }
// }


// const updateUserEmailCon = async (req,res) => {
//     let {user_id,email} = req.body;
//     try {
//         await updateUserEmail(user_id,email);
//     res.status(200).json({
//         message:"User email updated successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while updating user email"
//         })
//     }
// }

export {getAllUsersCon,getUserByIdCon,addUserCon,deleteUserCon,updateUserDetailsCon}

