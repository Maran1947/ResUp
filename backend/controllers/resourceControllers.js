const Resource = require('../models/Resource');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports.save_resource = async (req, res) => {

    const { token, title, link } = req.body;
    const decode = jwt.verify(token, 'resup secret');
    const data = {
        userId: decode.id,
        resources: [{ title: title, link: link }]
    }
    try {
        const resource = await Resource.find({ "userId": decode.id });
        if (resource.length === 0) {
            try {
                const newResource = new Resource(data);
                const savedResource = await newResource.save(newResource);
                res.status(200).json({ success: true, message: "Successfully saved!" });
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            try {
                const resData = {
                    title: title,
                    link: link
                } 
                const updateResource = await Resource.findOneAndUpdate({ userId: decode.id },{ $push: { "resources": resData } });
                res.status(201).json({ success: true, message: "✅ Saved successfully!" });
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.get_resource = async (req, res) => {
    const decoded = jwt.verify(req.body.token, 'resup secret');
    try {
        const userResources = await Resource.find({ "userId": decoded.id });
        return res.status(200).json({ userResources });
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports.delete_resource = async (req, res) => {
    const decoded = jwt.verify(req.body.token, 'resup secret');
    try {
        const userResource = await Resource.find({ "userId": decoded.id });
        // console.log(userResource);
        if (userResource.length !== 0) {
            try {
                const deletedResource = await Resource.updateOne({ $pull: { "resources": { "title": req.body.title} } });
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

