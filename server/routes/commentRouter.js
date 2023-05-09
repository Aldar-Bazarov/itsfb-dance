const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');
const checkAuth = require('../middleware/authMiddleware');

router.post('/', checkAuth, commentController.create);
router.get('/', commentController.get);

module.exports = router;