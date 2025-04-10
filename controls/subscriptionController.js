import {getAllSubscriptions, getSubscriptionById, addSubscription, deleteSubscription, updateSubscription} from "../models/subscription_db.js";

const getAllSubscriptionsCon = async (req, res) => {
    try {
        res.json(await getAllSubscriptions());
    } catch (err) {
        console.log(err);
    }
}

const getSubscriptionByIdCon = async (req, res) => {
    try {
        res.status(200).json(await getSubscriptionById(req.params.subscription_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting the subscription"
        })
    }
}

// const getSubscriptionsByNameCon = async (req, res) => {
//     try {
//         await getSubscriptionsByName(req.params.name);
//         res.status(200).json({
//             message:"Subscriptions found successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting the subscriptions"
//         })
//     }
// }

// const getSubscriptionsByDurationCon = async (req, res) => {
//     try {
//         await getSubscriptionsByDuration(req.params.duration_months);
//         res.status(200).json({
//             message:"Subscriptions found successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting the subscriptions"
//         })
//     }
// }

const addSubscriptionCon = async (req, res) => {
    try {
        await addSubscription(req.body);
        res.status(200).json({
            message:"Subscription added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding the subscription"
        })
    }
}

const deleteSubscriptionCon = async (req, res) => {
    try {
        await deleteSubscription(req.params.subscription_id);
        res.status(200).json({
            message:"Subscription deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting the subscription"
        })
    }
}

const updateSubscriptionCon = async (req, res) => {
    try {
        await updateSubscription(req.params.subscription_id, req.body);
        res.status(200).json({
            message:"Subscription updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating the subscription"
        })
    }
}

export {getAllSubscriptionsCon, getSubscriptionByIdCon, addSubscriptionCon, deleteSubscriptionCon, updateSubscriptionCon};