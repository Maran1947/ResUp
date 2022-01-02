const { Router } = require('express');
const resourceControllers = require('../controllers/resourceControllers');

const router = Router();

router.post('/get-resource', resourceControllers.get_resource);
router.post('/save-resource', resourceControllers.save_resource);
router.post('/delete-resource', resourceControllers.delete_resource);


module.exports = router;