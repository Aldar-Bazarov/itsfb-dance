const Router = require('express');
const router = new Router();
const newsRouter = require('./newsRouter');
const schoolRouter = require('./schoolRouter');
const userRouter = require('./userRouter');
const commentRouter = require('./commentRouter');
const eventRouter = require('./eventRouter');

router.use('/user', userRouter);
router.use('/news', newsRouter);
router.use('/school', schoolRouter);
router.use('/comment', commentRouter);
router.use('/event', eventRouter)

module.exports = router;