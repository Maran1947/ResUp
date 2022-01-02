const { Router } = require('express');
const activityControllers = require('../controllers/activityControllers');

const router = Router();

router.post('/get-activity', activityControllers.get_activity);
router.post('/save-activity', activityControllers.save_activity);
router.post('/delete-activity', activityControllers.delete_activity);


module.exports = router;