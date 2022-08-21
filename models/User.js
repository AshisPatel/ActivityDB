const { Schema, model} = require('mongoose'); 

const GameSchema = new Schema({
    gameId: {
        type: Schema.Types.ObjectId, 
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const CompletedActivitySchema = new Schema({
    activityName: {
        type: String, 
        required: true,
        minLength: 1,
        unique: true,
    },
    game: {
        GameSchema
    },
    duration: {
        type: Number,
        required: true 
    },
    points: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: dayjs(),
        get: createdAtVal => dayjs(createdAtVal).format('hh:mmA - MM/DD/YYYY')
    }
});


const UserSchema = new Schema({
    username: {
        type: String,
        required: true, 
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    completedActivities: [CompletedActivitySchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
});

UserSchema.virtual('points').get(function() {
    pointsMap = {};  
    this.completedActivities.map(activity => {
        if (activity.name in pointsMap) {
            pointsMap[activity.name] += activity.points; 
        } else {
            pointsMap[activity.name] = activity.points; 
        }
    });
    return pointsMap; 
});

// function to check for unique user ID
UserSchema.statics.doesUserExist = async function(user) {
    if(!user) throw new Error('Invalid user input'); 
    try {
        const userCheck = await this.findOne({userName: user}); 
        return userCheck ? false : true; 
    } catch (err) {
        console.log("Error with checking for unique user", err);
        return false;  
    }
}

// set up pre-save middleware to create password
UserSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  UserSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };