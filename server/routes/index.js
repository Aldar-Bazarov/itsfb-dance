const Router = require('express');
const router = new Router();
const newsRouter = require('./newsRouter');
const schoolRouter = require('./schoolRouter');
const userRouter = require('./userRouter');

router.use('/user', userRouter);
router.use('/news', newsRouter);
router.use('/school', schoolRouter);

module.exports = router;