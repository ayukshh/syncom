import Attendance from "../models/model_attendance.js";

export const GetAttendance = async (req, res, next) => {
    try {
        const records = await Attendance.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.json(records);
    } catch (err) {
        next(err);
    }
};

export const DoAttendance = async (req, res, next) => {
    try {
        const newRecord = new Attendance({
            user: req.user._id,
            status: req.body.status, 
            checkIn: Date.now(),
        });

        await newRecord.save();

        res.status(201).json(newRecord);

    } catch (err) {
        // Duplicate attendance for same day
        if (err.code === 11000) {
            return res.status(400).json({
                message: "Attendance already marked for today."
            });
        }
        next(err);
    }
};
