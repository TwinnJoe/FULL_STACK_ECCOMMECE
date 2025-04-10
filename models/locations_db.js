import {pool} from "../config/config.js";

const getAllLocations = async () => {
    let [data] = await pool.query("SELECT * FROM locations");
    return data
}


const getLocationById = async (location_id) => {
    let [data] = await pool.query("SELECT * FROM locations WHERE location_id = ?", [location_id]);
    return data
}


// const getLocationByCity = async (city) => {
//     let [data] = await pool.query("SELECT * FROM locations WHERE city = ?", [city]);
//     return data
// }


// const getLocationByProvince = async (province) => {
//     let [data] = await pool.query("SELECT * FROM locations WHERE province = ?", [province]);
//     return data
// }


const addLocation = async ({city, province, country}) => {
    await pool.query("INSERT INTO locations (city, province, country) VALUES (?, ?, ?)", [city, province, country]);
}


const deleteLocation = async (location_id) => {
    await pool.query("DELETE FROM locations WHERE location_id = ?", [location_id]);
}


const updateLocation = async (location_id,{city, province, country}) => {
    await pool.query("UPDATE locations SET city = ?, province = ?, country = ? WHERE location_id = ?", [city, province, country, location_id]);
}

export {getAllLocations, getLocationById, addLocation, deleteLocation, updateLocation}

