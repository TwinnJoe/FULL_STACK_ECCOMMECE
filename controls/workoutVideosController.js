import {getAllWorkoutVideos, getWorkoutVideoById, addWorkoutVideo, deleteWorkoutVideo, updateWorkoutVideo} from "../models/workoutVideos_db.js";

const getAllWorkoutVideosCon = async (req, res) => {
    try {
        res.status(200).json(await getAllWorkoutVideos());
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting all workout videos"
        });
    }
}

const getWorkoutVideosByIdCon = async (req, res) => {
    try {
        res.status(200).json(await getWorkoutVideoById(req.params.video_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting the workout video"
        })
    }
}


// const getWorkoutVideosByCategoryCon = async (req, res) => {
//     try {
//         await getWorkoutVideosByCategory(req.params.category);
//         res.status(200).json({
//             message:"Workout videos found successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting workout videos by category"
//         });
//     }
// }


const addWorkoutVideoCon = async (req, res) => {
    try {
        await addWorkoutVideo(req.body);
        res.status(200).json({
            message:"Workout video added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding the workout video"
        })
    }
}


const deleteWorkoutVideoCon = async (req, res) => {
    try {
        await deleteWorkoutVideo(req.params.video_id);
        res.status(200).json({
            message:"Workout video deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting the workout video"
        });
    }
}


const updateWorkoutVideoCon = async (req, res) => {
    try {
        await updateWorkoutVideo(req.params.video_id, req.body);
        res.status(200).json({
            message:"Workout video updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating the workout video"
        });
    }
}

export {getAllWorkoutVideosCon, getWorkoutVideosByIdCon, addWorkoutVideoCon, deleteWorkoutVideoCon, updateWorkoutVideoCon};