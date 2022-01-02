const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
  
    userId: {
        type: String,
        required: true
    },
    yearlyGoal: {
        type: String,
    },
    monthlyGoal: {
        type: String,
    }

})

const Goal = mongoose.model('goal', goalsSchema);

module.exports = Goal;