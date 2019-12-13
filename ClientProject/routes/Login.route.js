var express = require('express');
var router = express.Router();

//Khai báo conntroller
var LoginController = require('../controller/Login.controller');

// Login/
router.get('/',LoginController.Auth, LoginController.HienThiTrangDangNhap);

router.post('/', LoginController.KiemTraDangNhap);

module.exports = router;
