const Router = require('express');
const router = new Router();
const newsRouter = require('./newsRouter');
const schoolRouter = require('./schoolRouter');
const userRouter = require('./userRouter');
const commentRouter = require('./commentRouter')

router.use('/user', userRouter);
router.use('/news', newsRouter);
router.use('/school', schoolRouter);
router.use('/comment', commentRouter);

module.exports = router;