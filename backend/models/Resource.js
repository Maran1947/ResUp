const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  
    userId: {
        type: String,
        required: true
    },
    resources: {
        type: Array,
        default: []
    }

})

const Resource = mongoose.model('resource', resourceSchema);

module.exports = Resource;