const Router = require('express');
const router = new Router();
const registrationSecretKeyController = require('../controllers/registrationSecretKeyController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), registrationSecretKeyController.create);
router.get('/', checkRole('ADMIN'), registrationSecretKeyController.get);
router.put('/', checkRole('ADMIN'), registrationSecretKeyController.update);

module.exports = router;