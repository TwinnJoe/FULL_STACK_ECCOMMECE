import {getAllLocations, getLocationById, addLocation, deleteLocation, updateLocation} from "../models/locations_db.js";

const getAllLocationsCon = async (req, res) => {
    try {
        res.status(200).json(await getAllLocations());
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting all locations"
        });
    }
}

const getLocationbyIdCon = async (req, res) => {
    try {
        res.status(200).json(await getLocationById(req.params.location_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting location by id"
        });
    }
}

// const getLocationByCityCon = async (req, res) => {
//     try {
//         await getLocationByCity(req.params.city);
//         res.status(200).json({
//             message:"Successfully got location by city"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting location by city"
//         });
//     }
// }

// const getLocationByProvinceCon = async (req, res) => {
//     try {
//         await getLocationByProvince(req.params.province);
//         res.status(200).json({
//             message:"Successfully got location by province"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting location by province"
//         });
//     }
// }

const addLocationCon = async (req, res) => {
    try {
        await addLocation(req.body);
        res.status(200).json({
            message:"Location added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding location"
        });
    }
}

const deleteLocationCon = async (req, res) => {
    try {
        await deleteLocation(req.params.location_id);
        res.status(200).json({
            message:"Location deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting location"
        });
    }
}

const updateLocationCon = async (req, res) => {
    try {
        await updateLocation(req.params.location_id, req.body);
        res.status(200).json({
            message:"Location updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating location"
        });
    }
}

export {getAllLocationsCon, getLocationbyIdCon, addLocationCon, deleteLocationCon, updateLocationCon};
