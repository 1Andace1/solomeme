const router = require('express').Router();
const whalesRouter = require('./whales.api.router');
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');

router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
router.use('/whales', whalesRouter);

module.exports = router;
