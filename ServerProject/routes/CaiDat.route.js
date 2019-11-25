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
router.put('/SoSanPhamMoiTrang', CaiDatController.SuaSoSanPhamMoiTrang);

//Sửa số item mỗi trang quản lý
router.put('/SoItemMoiTrangQL', CaiDatController.SuaSoItemMoiTrangQL);

//Sửa thời gian login
router.put('/ThoiGianLogin', CaiDatController.SuaThoiGianLogin);

//Sửa secretkey
router.put('/SecrectKey', CaiDatController.SuaSecrectKeyAdmin);

//Đổi mật khẩu
router.put('/DoiMK', CaiDatController.DoiMK);



module.exports = router;




