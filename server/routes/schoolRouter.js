const Router = require('express');
const router = new Router();
const schoolController = require('../controllers/schoolController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), schoolController.create);
router.get('/', schoolController.getAll);
router.get('/:id', schoolController.getOne);
router.delete('/:id', checkRole('ADMIN'), schoolController.delete);
router.put('/:id', checkRole('ADMIN'), schoolController.update);

module.exports = router;