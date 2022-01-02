const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  
    userId: {
        type: String,
        required: true
    },
    activities: {
        type: Array,
        default: []
    }

})

const Activity = mongoose.model('activity', activitySchema);

module.exports = Activity;