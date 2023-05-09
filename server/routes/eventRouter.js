const Router = require('express');
const router = new Router();
const eventController = require('../controllers/eventController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), eventController.create);
router.get('/', eventController.getAll);
router.get('/old', eventController.getAllOld);
router.get('/closest', eventController.getClosestEvent);
router.delete('/:id', checkRole('ADMIN'), eventController.delete);


module.exports = router;