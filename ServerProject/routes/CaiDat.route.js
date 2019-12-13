var express = require('express');
var router = express.Router();

//Khai báo conntroller
var CaiDatController = require('../controllers/CaiDat.controller');
var AuthController = require('../controllers/Auth.controller');
var CaiDatValidate = require('../Validator/CaiDat.validate');


//Route (Web/api/CaiDats/)

//Lấy tất cả cài đặt
router.get('/', CaiDatController.LayTatCaCaiDat);

//Sửa số sản phẩm mỗi trang
router.put('/SoSanPhamMoiTrang', AuthController.KiemTraTokenAdmin, CaiDatValidate.Validate_SoSanPhamMoiTrang,CaiDatController.SuaSoSanPhamMoiTrang);

//Sửa số item mỗi trang quản lý
router.put('/SoItemMoiTrangQL', AuthController.KiemTraTokenAdmin, CaiDatValidate.Validate_SoSanPhamMoiTrang, CaiDatController.SuaSoItemMoiTrangQL);

//Sửa thời gian login
router.put('/ThoiGianLogin', AuthController.KiemTraTokenAdmin, CaiDatValidate.Validate_SoSanPhamMoiTrang, CaiDatController.SuaThoiGianLogin);

//Sửa secretkey
router.put('/SecrectKey', AuthController.KiemTraTokenAdmin,CaiDatValidate.Validate_SecetKey, CaiDatController.SuaSecrectKeyAdmin);

//Đổi mật khẩu
router.put('/DoiMK', AuthController.KiemTraTokenAdmin, CaiDatValidate.Validate_MatKhau, CaiDatController.DoiMK);



module.exports = router;




