const Activity = require('../models/Activity');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports.save_activity = async (req, res) => {

    const { token, activity } = req.body;
    const decode = jwt.verify(token, 'resup secret');
    const data = {
        userId: decode.id,
        activities: [activity]
    }
    try {
        const activity = await Activity.find({ "userId": decode.id });
        if (activity.length === 0) {
            try {
                const newActivity = new Activity(data);
                const savedActivity = await newActivity.save();
                res.status(200).json({ success: true, message: "Successfully saved!" });
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            try {
                const updateActivity = await Activity.findOneAndUpdate({ userId: decode.id },{ $push: { "activities": req.body.activity } });
                res.status(201).json({ success: true, message: "✅ Saved successfully!" });
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.get_activity = async (req, res) => {
    const decoded = jwt.verify(req.body.token, 'resup secret');
    try {
        const userActivities = await Activity.find({ "userId": decoded.id });
        return res.status(200).json({ userActivities });
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports.delete_activity = async (req, res) => {
    const decoded = jwt.verify(req.body.token, 'resup secret');
    try {
        const userActivities = await Activity.find({ "userId": decoded.id });
        // console.log(userResource);
        if (userActivities.length !== 0) {
            try {
                const deletedActivity = await Activity.updateOne({ $pull: { "activities": req.body.activity } });
                // console.log(deletedResource);
                res.status(201).json({ success: true, message: "Deleted successfully!" });
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

