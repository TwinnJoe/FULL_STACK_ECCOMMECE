import {getAllAdmins,getAdminById,addAdmin,deleteAdmin,updateAdmin} from "../models/admin_db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const loginAdminCon = async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await getAdminByUsername(username);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      const token = jwt.sign(
        { admin_id: admin.id, username: admin.username },
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
      req.admin = decoded;
      next();
    });
  };
  
  const getAllAdminCon = async (req, res) => {
    try {
      res.status(200).json(await getAllAdmins());
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "There was an error while getting all admins",
      });
    }
  };
  
  const getAdminByIdCon = async (req, res) => {
    try {
      res.status(200).json(await getAdminById(req.params.admin_id));
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "There was an error while getting admin by id",
      });
    }
  };
  
  const addAdminCon = async (req, res) => {
    try {
      const { password, ...adminData } = req.body; // Extract password and the rest of the admin data
      const hash_word = await bcrypt.hash(password, 10);
      await addAdmin({ ...adminData, password: hash_word }); // Add the hashed password to the admin data
      res.status(200).json({
        message: "Admin added successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "There was an error while adding admin",
      });
    }
  };
  
  const deleteAdminCon = async (req, res) => {
    try {
      await deleteAdmin(req.params.admin_id);
      res.status(200).json({
        message: "Admin deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "There was an error while deleting admin",
      });
    }
  };
  
  const updateAdminCon = async (req, res) => {
    try {
      const { password, ...adminData } = req.body;
      if(password){
        const hash_word = await bcrypt.hash(password,10)
        await updateAdmin(req.params.admin_id, {...adminData, password:hash_word});
      } else {
        await updateAdmin(req.params.admin_id,adminData);
      }
  
      res.status(200).json({
        message: "Admin updated successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "There was an error while updating admin",
      });
    }
  };

// const updateAdminPasswordCon = async (req,res) => {
//     try {
//         await updateAdminPassword(req.params.admin_id,req.body.password);
//         res.status(200).json({
//             message:"Admin password updated successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while updating admin password"
//         });
//     }
// }

// const updateAdminEmailCon = async (req,res) => {
//     try {
//         await updateAdminEmail(req.params.admin_id,req.body.email);
//         res.status(200).json({
//             message:"Admin email updated successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while updating admin email"
//         });
//     }
// }

export {loginAdminCon, authenticateToken, getAllAdminCon, getAdminByIdCon, addAdminCon, deleteAdminCon, updateAdminCon};