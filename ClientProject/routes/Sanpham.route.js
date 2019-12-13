var express = require('express');
var router = express.Router();

//Khai báo conntroller
var SanPhamController = require('../controller/SanPham.controller');


//Route SanPham (Web/SanPhams/)

//Hiển thị chi tiết sản phấm
router.get('/:id', SanPhamController.HienThiChiTietSanPham);

//Hiển thị trang thanh toán
router.get('/thanhtoan/sp', SanPhamController.HienThiTrangThanhToan);

//Hiển thị trang thông báo thnah toán thành công
router.get('/thongbao/sp', SanPhamController.HienThiTrangThongBao);

module.exports = router;
