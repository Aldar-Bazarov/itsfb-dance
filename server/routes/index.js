const Router = require('express');
const router = new Router();
const newsRouter = require('./newsRouter');
const schoolRouter = require('./schoolRouter');
const userRouter = require('./userRouter');
const commentRouter = require('./commentRouter');
const eventRouter = require('./eventRouter');
const registrationSecretKeyRouter = require('./registrationSecretKeyRouter');
const groupRouter = require('./groupRouter');
const scheduleRouter = require('./scheduleRouter');
const attendanceRouter = require('./attendanceRouter');

router.use('/user', userRouter);
router.use('/news', newsRouter);
router.use('/school', schoolRouter);
router.use('/comment', commentRouter);
router.use('/event', eventRouter);
router.use('/registrationsecretkey', registrationSecretKeyRouter);
router.use('/group', groupRouter);
router.use('/schedule', scheduleRouter);
router.use('/attendance', attendanceRouter);

module.exports = router;