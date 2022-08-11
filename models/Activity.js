const { Schema, model } = require('mongoose'); 

const ActivitySchema = new Schema({
    activityName: {
        type: String, 
        required: true,
        minLength: 1
    },
    activityCoefficient: {
        type: Number,
        required: true,
        default: 1
    }
});

const Activity = model('Activity', ActivitySchema); 

module.exports = Activity; 

