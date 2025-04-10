import {pool} from "../config/config.js";

const getAllSubscriptions = async () => {
    let [data] = await pool.query("SELECT * FROM subscriptions");
    return data
}


const getSubscriptionById = async (subscription_id) => {
    let [data] = await pool.query("SELECT * FROM subscriptions WHERE subscription_id = ?", [subscription_id]);
    return data
}


// const getSubscriptionsByName = async (name) => {
//     let [data] = await pool.query("SELECT * FROM subscriptions WHERE name = ?", [name]);
//     return data
// }


// const getSubscriptionsByDuration = async (duration_months) => {
//     let [data] = await pool.query("SELECT * FROM subscriptions WHERE duration_months = ?", [duration_months]);
//     return data
// }


const addSubscription = async ({subscription_id,name,price,benefit_1,benefit_2,benefit_3,benefit_4,benefit_5,benefit_6,benefit_7,duration_months}) => {
    await pool.query("INSERT INTO subscriptions (subscription_id,name,price,benefit_1,benefit_2,benefit_3,benefit_4,benefit_5,benefit_6,benefit_7,duration_months) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [subscription_id,name,price,benefit_1,benefit_2,benefit_3,benefit_4,benefit_5,benefit_6,benefit_7,duration_months]);
}


const deleteSubscription = async (subscription_id) => {
    await pool.query("DELETE FROM subscriptions WHERE subscription_id = ?", [subscription_id]);
}


const updateSubscription = async (subscription_id, { name, price, benefit_1, benefit_2, benefit_3, benefit_4, benefit_5, benefit_6, benefit_7, duration_months }) => {
    await pool.query(
        "UPDATE subscriptions SET name=?, price=?, benefit_1=?, benefit_2=?, benefit_3=?, benefit_4=?, benefit_5=?, benefit_6=?, benefit_7=?, duration_months=? WHERE subscription_id = ?",
        [name, price, benefit_1, benefit_2, benefit_3, benefit_4, benefit_5, benefit_6, benefit_7, duration_months, subscription_id]
    );
};

export {getAllSubscriptions, getSubscriptionById, addSubscription, deleteSubscription, updateSubscription}
