const { Activity } = require('../models'); 

const activityController = {
    getActivities(req, res) {
        Activity.find({})
            .sort({ _id: -1 })
            .select('-__v')
            .then(dbActivityData => res.status(200).json(dbActivityData))
            .catch(err => {
                console.log(err); 
                res.status(500).json(err); 
            }); 
    }, 

    getActivityById({ params }, res) {
        Activity.findById(params.activityId)
            .select('-__v')
            .then(dbActivityData => {
                dbActivityData ? 
                    res.status(200).json(dbActivityData) :
                    res.status(404).json({ message: "No activity found with that id!"});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err); 
            }); 
    },

    createActivity({ body }, res) {
        Activity.create(body)
            .then(dbActivityData => {
                dbActivityData ? 
                    res.status(200).json(dbActivityData) :
                    res.status(404).json({ message: "Activity failed to add"});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err); 
            }); 
    }, 

    updateActivity({ params, body }, res) {
        Activity.findByIdAndUpdate(
            params.activityId,
            body,
            {
                new: true,
                runValidators: true
            }
        )
            .then(dbActivityData => {
                dbActivityData ?
                    res.status(200).json(dbActivityData) :
                    res.status(404).json({ message: "No activity found with that id!"}); 
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err); 
            }); 
    }, 

    deleteActivity({ params }, res) {
        Activity.findByIdAndDelete(params.activityId)
            .then(dbActivityData => {
                dbActivityData ? 
                res.status(200).json(dbActivityData) :
                res.status(404).json({message: "No activities found with that id!"});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err); 
            }); 
    }


};

module.exports = activityController; 