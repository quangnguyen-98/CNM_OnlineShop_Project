var express = require('express');
var router = express.Router();
const api_helper = require('./API_helper');
const app = express();

//Khai báo conntroller
var SanPhamController = require('../controller/SanPham.controller');

/* GET trang chủ */
router.get('/:id', SanPhamController.HienThiChiTietSanPham);




module.exports = router;
