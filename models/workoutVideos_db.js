import {pool} from "../config/config.js";

const getAllWorkoutVideos = async () => {
    let [data] = await pool.query("SELECT * FROM workout_videos");
    return data
}


const getWorkoutVideoById = async (video_id) => {
    let [data] = await pool.query("SELECT * FROM workout_videos WHERE video_id = ?", [video_id]);
    return data
}


// const getWorkoutVideosByCategory = async (category) => {
//     let [data] = await pool.query("SELECT * FROM workout_videos WHERE category = ?", [category]);
//     return data
// }


const addWorkoutVideo = async ({title,description,url,category}) => {
    let [data] = await pool.query("INSERT INTO workout_videos (title,description,url,category) VALUES (?,?,?,?)", [title,description,url,category]);
}


const deleteWorkoutVideo = async (video_id) => {
    let [data] = await pool.query("DELETE FROM workout_videos WHERE video_id = ?", [video_id]);
}


const updateWorkoutVideo = async (video_id,{title,description,url,category}) => {
    let [data] = await pool.query("UPDATE workout_videos SET title = ?, description = ?, url = ?, category = ? WHERE video_id = ?", [title,description,url,category,video_id]);
}

export {getAllWorkoutVideos, getWorkoutVideoById, addWorkoutVideo, deleteWorkoutVideo, updateWorkoutVideo}

