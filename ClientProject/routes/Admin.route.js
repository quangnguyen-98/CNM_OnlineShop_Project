var express = require('express');
var router = express.Router();

//Khai báo conntroller
var AdminController = require('../controller/Admin.controller');
var AuthController = require('../controller/Auth.controller');
// Admin/
/*router.get('/', AdminController.HienThiTrangDangNhap);*/

router.get('/', AdminController.HienThiQuanLySanPham);

router.get('/QuanLySanPham', AdminController.HienThiQuanLySanPham);

router.get('/QuanLyDanhMuc', AdminController.HienThiQuanLyDanhMuc);

router.get('/QuanLyThuongHieu', AdminController.HienThiQuanLyThuongHieu);

router.get('/QuanLyCarousel', AdminController.HienThiQuanLyCarousel);

router.get('/QuanLyBaiViet', AdminController.HienThiQuanLyBaiViet);

router.get('/DangXuat', AdminController.DangXuat);




module.exports = router;
