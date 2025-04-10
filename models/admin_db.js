import {pool} from "../config/config.js";

const getAllAdmins = async () => {
    let [data] = await pool.query("SELECT * FROM admin");
    return data
}


const getAdminById = async (admin_id) => {
    let [data] = await pool.query("SELECT * FROM admin WHERE admin_id = ?", [admin_id]);
    return data
}


const addAdmin = async ({name,email,password}) => {
    let [data] = await pool.query("INSERT INTO admin (name,email,password) VALUES (?,?,?)", [name,email,password]);
}


const deleteAdmin = async (admin_id) => {
    let [data] = await pool.query("DELETE FROM admin WHERE admin_id = ?", [admin_id]);
}

const updateAdmin = async (admin_id,{name,email,password}) => {
    let [data] = await pool.query("UPDATE admin SET name = ?, email = ?, password = ? WHERE admin_id = ?", [name,email,password,admin_id]);
}


// const updateAdminPassword = async (admin_id,password) => {
//     let [data] = await pool.query("UPDATE admins SET password = ? WHERE admin_id = ?", [password,admin_id]);
// }


// const updateAdminEmail = async (admin_id,email) => {
//     let [data] = await pool.query("UPDATE admins SET email = ? WHERE admin_id = ?", [email,admin_id]);
// }

export {getAllAdmins,getAdminById,addAdmin,deleteAdmin,updateAdmin};