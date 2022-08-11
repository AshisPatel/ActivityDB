const { Schema, model } = require('mongoose'); 

const ActivitySchema = new Schema({
    activityName: {
        type: String, 
        required: true,
        minLength: 1,
        unique: true,
    },
    activityCoefficient: {
        type: Number,
        required: true,
        default: 1
    }
});

ActivitySchema.statics.doesActivityExist = async function(activity) {
    if(!activity) throw new Error('Invalid activity input'); 
    try {
        const activityCheck = await this.findOne({activityName: activity}); 
        return activityCheck ? false : true; 
    } catch (err) {
        console.log("Error with checking for unique activity", err);
        return false;  
    }
}

const Activity = model('Activity', ActivitySchema); 

module.exports = Activity; 

