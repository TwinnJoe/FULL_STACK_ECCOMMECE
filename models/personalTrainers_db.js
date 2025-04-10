import {pool} from "../config/config.js";

const getAllPersonalTrainers = async () => {
    let [data] = await pool.query("SELECT * FROM personal_trainers");
    return data
}


const getPersonalTrainerById = async (trainer_id) => {
    let [data] = await pool.query("SELECT * FROM personal_trainers WHERE trainer_id = ?", [trainer_id]);
    return data
}


// const getPersonalTrainersBySpecialization = async (specialization) => {
//     let [data] = await pool.query("SELECT * FROM personal_trainers WHERE specialization = ?", [specialization]);
//     return data
// }


// const getPersonalTrainersByExperience = async (experience) => {
//     let [data] = await pool.query("SELECT * FROM personal_trainers WHERE experience = ?", [experience]);
//     return data
// }


const addPersonalTrainer = async ({name,email,password,specialization,experience,image_url}) => {
    await pool.query("INSERT INTO personal_trainers (name,email,password,specialization,experience,image_url) VALUES (?,?,?,?,?,?)", [name,email,password,specialization,experience,image_url]);
}


const deletePersonalTrainer = async (trainer_id) => {
    await pool.query("DELETE FROM personal_trainers WHERE trainer_id = ?", [trainer_id]);
}


const updatePersonalTrainer = async (trainer_id,{name,email,password,specialization,experience,image_url}) => {
    await pool.query("UPDATE personal_trainers SET name = ?, email = ?, password = ?, specialization = ?, experience = ?, image_url = ? WHERE trainer_id = ?", [name,email,password,specialization,experience,image_url, trainer_id]);
}
// const updatePersonalTrainerEmailPassword = async (trainer_id,email,password) => {
//     await pool.query("UPDATE personal_trainers SET email = ?, password = ? WHERE trainer_id = ?", [email,password, trainer_id]);
// }

export {getAllPersonalTrainers,getPersonalTrainerById,addPersonalTrainer,deletePersonalTrainer,updatePersonalTrainer};

