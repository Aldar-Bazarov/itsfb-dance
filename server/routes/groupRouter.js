const Router = require('express');
const router = new Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), groupController.create);
router.get('/', authMiddleware, groupController.get);
router.get('/getAll', authMiddleware, groupController.getAll);
router.post('/addStudent', authMiddleware, groupController.addStudent);
router.delete('/:id', authMiddleware, groupController.delete);

module.exports = router;