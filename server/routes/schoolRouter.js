const Router = require('express');
const router = new Router();
const schoolController = require('../controllers/schoolController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), schoolController.create);
router.get('/', schoolController.get);
router.put('/', checkRole('ADMIN'), schoolController.update);

module.exports = router;