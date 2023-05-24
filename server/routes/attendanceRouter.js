const Router = require('express');
const router = new Router();
const attendanceController = require('../controllers/attendanceController');
const checkAuth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('TEACHER'), attendanceController.create);
router.get('/', checkAuth, attendanceController.get);

module.exports = router;