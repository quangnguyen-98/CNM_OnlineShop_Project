var express = require('express');
var router = express.Router();

//Khai báo conntroller
var HoaDonController = require('../controllers/HoaDon.controller');
var AuthController = require('../controllers/Auth.controller');
var HoaDonValidate = require('../Validator/HoaDon.validate');
var ThongKeController = require('../controllers/ThongKe.controller');
//Route (Web/api/HoaDons/)

//Lấy tất cả hóa đơn
router.get('/:sorttype', HoaDonController.LayTatCaHoaDon);

//Lấy hóa đơn theo số trang
router.get('/:sorttype/:pagenumber',  HoaDonController.LayHoaDonTheoSoTrang);

//Lấy hóa đơn theo id, tên, sđt
router.get('/timhoadon/:sorttype/:searchtype/:searchkey', HoaDonController.LayHoaDonTheoSearchKey);

//Tạo hóa đơn
router.post('/themhoadon', HoaDonValidate.ValidateHoaDon, HoaDonController.ThemHoaDon);

//Chuyển trạng thái hóa đơn
router.put('/:idhoadon/:trangthai', AuthController.KiemTraTokenAdmin, HoaDonController.ChuyenTrangThaiHoaDon);

//Chuyển trạng thái hóa đơn sang hoàn thành (cập nhật số lượng size)
router.put('/hoanthanh/:idhoadon/:trangthai', AuthController.KiemTraTokenAdmin, HoaDonController.ChuyenTrangThaiHoaDon_HoanThanh);

//Thống kê
router.get('/thongke/:thang/:nam/:pagenumber', AuthController.KiemTraTokenAdmin, HoaDonValidate.Validate_Ngay_Nam_ThongKe,  ThongKeController.LayHoaDonTheoSoTrang);




module.exports = router;
