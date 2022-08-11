const router = require('express').Router(); 
const {
    getActivities,
    getActivityById,
    createActivity, 
    updateActivity,
    deleteActivity
} = require('../../controllers/activity-controller');

router
    .route('/')
    .get(getActivities)
    .post(createActivity); 

router
    .route('/:activityId')
    .get(getActivityById)
    .put(updateActivity)
    .delete(deleteActivity);

module.exports = router; 