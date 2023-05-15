const Router = require('express');
const router = new Router();
const scheduleController = require('../controllers/scheduleController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', checkRole('ADMIN'), scheduleController.create);
router.get('/', authMiddleware, scheduleController.get);
router.get('/old', checkRole('TEACHER'), scheduleController.getAllOld);

module.exports = router;