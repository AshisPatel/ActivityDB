const { Schema, model } = require('mongoose');

// Point total

// Name

// Player List

// Team ID

const TeamSchema = new Schema({
    teamId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        getters: true,
        virtuals: true 
    }
});

TeamSchema.virtual('totalPoints').get(function() {
    sum = 0; 
    this.users.map(user => {
    
    });

})

