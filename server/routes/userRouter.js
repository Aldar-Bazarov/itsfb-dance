const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/info', authMiddleware, userController.getUserInfo);
router.get('/getUsersByRole', checkRole('ADMIN'), userController.getUsersByRole);
router.put('/update/:id', authMiddleware, userController.update);
router.put('/updateImage/:id', authMiddleware, userController.updateImage);

module.exports = router;