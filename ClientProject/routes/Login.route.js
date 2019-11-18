var express = require('express');
var router = express.Router();

//Khai báo conntroller
var LoginController = require('../controller/Login.controller');

// Admin/
router.get('/', LoginController.HienThiTrangDangNhap);

router.post('/', LoginController.KiemTraDangNhap);






module.exports = router;
