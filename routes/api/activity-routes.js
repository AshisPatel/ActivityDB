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
    .get(getActivities);

router
    .route('/:activityId')
    .post(createActivity); 

router
    .route('/:activityId')
    .get(getActivityById)
    .put(updateActivity)
    .delete(deleteActivity);

module.exports = router; 