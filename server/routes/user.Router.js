const router = require('express').Router();
const userCtrl = require("../api/user.controller.js");

router.post('/registration', userCtrl.userRegister);
router.post('/registration/activation', userCtrl.userActivateEmail);
router.post('/login', userCtrl.userLogin);
router.get('/auth/refresh-token', userCtrl.getAsscessToken);
router.post('/reset/password', userCtrl.reqRestpassword);
router.post('/reset/password-activation', userCtrl.restpasswordActivateEmail);
router.post('/reset/rest-password', userCtrl.restPassword);
router.post('/login/email', userCtrl.userLoginWithEmail);
router.get('/logout', userCtrl.userLogout);
router.patch('/addticker', userCtrl.addTicker);
router.patch('/removeTicker', userCtrl.removeTicker);

module.exports = router