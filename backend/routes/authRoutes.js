const { Router } = require('express');
const authControllers = require('../controllers/authControllers');

const router = Router();

router.post('/signup', authControllers.signup_post);
router.post('/login', authControllers.login_post);
router.get('/logout', authControllers.logout_get);

router.post('/set-goal', authControllers.set_goal);
router.post('/get-goal', authControllers.get_goal);


module.exports = router;