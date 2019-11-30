var express = require('express');
var router = express.Router();

//Khai báo conntroller
var HoaDonController = require('../controllers/HoaDon.controller');
var AuthController = require('../controllers/Auth.controller');
var HoaDonValidate = require('../Validator/HoaDon.validate');

//Route (Web/api/HoaDons/)

//Lấy tất cả hóa đơn
router.get('/', HoaDonController.LayTatCaHoaDon);

//Lấy hóa đơn theo số trang
router.get('/:pagenumber',HoaDonController.LayHoaDonTheoSoTrang);

//Lấy hóa đơn theo tên
router.get('/timtheoten/:tenhoadon',HoaDonController.LayHoaDonTheoTen);

//Tạo hóa đơn
router.post('/themhoadon', HoaDonController.ThemHoaDon);

//Sửa hóa đơn
router.put('/:idhoadon/:tenhoadon', AuthController.KiemTraTokenAdmin, HoaDonValidate.KiemTraTrungTen, HoaDonController.SuaHoaDon);

//Xóa hóa đơn
router.delete('/:idhoadon', AuthController.KiemTraTokenAdmin, HoaDonController.XoaHoaDon);


module.exports = router;
