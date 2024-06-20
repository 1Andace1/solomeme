const router = require('express').Router();
const cookiesConfig = require('../configs/cookiesConfig');
const { verifyRefreshToken } = require('../middlewares/verifyToken');
const generateToken = require('../utils/generateToken');

router.get('/refresh', verifyRefreshToken, (req, res) => {
  const { accessToken, refreshToken } = generateToken({
    user: res.locals.user,
  });

  res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .json({ user: res.locals.user, accessToken });
});

module.exports = router;
