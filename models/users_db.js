import {pool} from "../config/config.js";

const getAllUsers = async () => {
    let [data] = await pool.query("SELECT * FROM users");
    return data
        
}


// const getUsersBySubscription = async (subscription_type) => {
//     let [data] = await pool.query("SELECT * FROM users WHERE subscription_type = ?", [subscription_type]);
//     return data
// }


const getUserById = async (user_id) => {
    let [data] = await pool.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
    return data
}


const addUser = async ({name,email,password,address,location_id,subscription_type}) => {
    let [data] = await pool.query("INSERT INTO users (name,email,password,address,location_id,subscription_type) VALUES (?,?,?,?,?,?)", [name,email,password,address,location_id,subscription_type]);
}


const deleteUser = async (user_id) => {
    await pool.query("DELETE FROM users WHERE user_id = ?", [user_id]);
}


const updateUserDetails = async (user_id,{name,email,password,address,location_id,subscription_type}) => {
    await pool.query("UPDATE users SET name = ?, email = ?, password = ?, address = ?, location_id = ?, subscription_type = ? WHERE user_id = ?", [name,email,password,address,location_id,subscription_type,user_id]);
}

// const updateUserPassword = async (user_id,password) => {
//     await pool.query("UPDATE users SET password = ? WHERE user_id = ?", [password,user_id]);
// }

// const updateUserEmail = async (user_id,email) => {
//     await pool.query("UPDATE users SET email = ? WHERE user_id = ?", [email,user_id]);
// }

export {getAllUsers,getUserById,addUser,deleteUser,updateUserDetails} 