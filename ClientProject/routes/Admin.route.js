var express = require('express');
var router = express.Router();

//Khai báo conntroller
var AdminController = require('../controller/Admin.controller');
var AuthController = require('../controller/Auth.controller');

//Route (Web/Admin/)

router.get('/', AdminController.HienThiQuanLySanPham);

router.get('/QuanLySanPham', AdminController.HienThiQuanLySanPham);

router.get('/QuanLyDanhMuc', AdminController.HienThiQuanLyDanhMuc);

router.get('/QuanLyThuongHieu', AdminController.HienThiQuanLyThuongHieu);

router.get('/QuanLyCarousel', AdminController.HienThiQuanLyCarousel);

router.get('/QuanLyBaiViet', AdminController.HienThiQuanLyBaiViet);

router.get('/QuanLyFooterMenu', AdminController.HienThiQuanLyFooterMenu);

router.get('/QuanLyFooterCH', AdminController.HienThiQuanLyFooterCH);

router.get('/QuanLyCaiDatCauHinh', AdminController.HienThiQuanLyCaiDatCauHinh);

router.get('/QuanLyCaiDatDoiMK', AdminController.HienThiQuanLyCaiDatDoiMK);

router.get('/QuanLyCaiDatDoiMK', AdminController.HienThiQuanLyFooterCH);

router.get('/QuanLyBaiViet', AdminController.HienThiQuanLyBaiViet);

router.get('/QuanLyMaGiamGia', AdminController.HienThiQuanLyMaGiamGia);

router.get('/DangXuat', AdminController.DangXuat);




module.exports = router;
