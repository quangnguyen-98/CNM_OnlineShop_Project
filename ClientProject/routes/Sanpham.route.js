var express = require('express');
var router = express.Router();

//Khai báo conntroller
var SanPhamController = require('../controller/SanPham.controller');

/* GET trang chủ */
router.get('/:id', SanPhamController.HienThiChiTietSanPham);




module.exports = router;
