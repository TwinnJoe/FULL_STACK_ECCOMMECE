import {getAllBookings, getBookingById, addBooking, deleteBooking, updateBooking} from "../models/bookings_db.js";

const getAllBookingsCon = async (req, res) => {
    try {
        res.status(200).json(await getAllBookings());
    } catch (err) {
        console.error(err);
        res.status(500).json({
        error:"There was an error while getting all bookings"
        });
    }
}

const getBookingByIdCon = async (req, res) => {
    try {
        res.status(200).json(await getBookingById(req.params.booking_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting booking by id"
        });
    }
}

// const getBookingsByDateCon = async (req, res) => {
//     try {
//         await getBookingsByDate(req.params.date);
//         res.status(200).json({
//             message:"Successfully got bookings by date"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting bookings by date"
//         });
//     }
// }

// const getBookingsByTimeCon = async (req, res) => {
//     try {
//         await getBookingsByTime(req.params.time);
//         res.status(200).json({
//             message:"Successfully got bookings by time"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting bookings by time"
//         });
//     }
// }

// const getBookingsByStatusCon = async (req, res) => {
//     try {
//         await getBookingsByStatus(req.params.status);
//         res.status(200).json({
//             message:"Successfully got bookings by status"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting bookings by status"
//         });
//     }
// }

// const getBookingByUserIdCon = async (req, res) => {
//     try {
//         await getBookingByUserId(req.params.user_id);
//         res.status(200).json({
//             message:"Successfully got booking by user id"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting booking by user id"
//         });
//     }
// }

// const getBookingByTrainerIdCon = async (req, res) => {
//     try {
//         await getBookingByTrainerId(req.params.trainer_id);
//         res.status(200).json({
//             message:"Successfully got booking by trainer id"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting booking by trainer id"
//         });
//     }
// }

const addBookingCon = async (req, res) => {
    try {
        await addBooking(req.body);
        res.status(200).json({
            message:"Booking added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding booking"
        });
    }
}

const deleteBookingCon = async (req, res) => {
    try {
        await deleteBooking(req.params.booking_id,req.body);
        res.status(200).json({
            message:"Booking deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting booking"
        });
    }
}

const updateBookingCon = async (req, res) => {
    try {
        await updateBooking(req.params.booking_id, req.body);
        res.status(200).json({
            message:"Booking updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating booking"
        });
    }
}

export {getAllBookingsCon, getBookingByIdCon, addBookingCon, deleteBookingCon, updateBookingCon};
