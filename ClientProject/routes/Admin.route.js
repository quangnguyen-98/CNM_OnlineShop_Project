var express = require('express');
var router = express.Router();
const api_helper = require('./API_helper');
const app = express();

//Khai báo conntroller
var AdminController = require('../controller/Admin.controller');

// Admin/
router.get('/', AdminController.HienThiTrangDangNhap);

router.get('/QuanLySanPham', AdminController.HienThiQuanLySanPham);

router.get('/QuanLyDanhMuc', AdminController.HienThiQuanLyDanhMuc);

router.get('/QuanLyThuongHieu', AdminController.HienThiQuanLyThuongHieu);




module.exports = router;
