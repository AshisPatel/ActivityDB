const router = require('express').Router(); 
const activityRoutes = require('./activity-routes'); 

router.use('/activities', activityRoutes); 

module.exports = router; 