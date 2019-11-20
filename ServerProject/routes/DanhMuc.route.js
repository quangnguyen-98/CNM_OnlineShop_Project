var express = require('express');
var router = express.Router();

//Khai báo conntroller
var DanhMucController = require('../controllers/DanhMuc.controller');
var AuthController = require('../controllers/Auth.controller');

//Lấy tất cả danhmuc  (Web/api/DanhMuc/)
router.get('/', AuthController.KiemTraTokenAdmin, DanhMucController.LayTatCaDanhMuc);

//Tạo danh mục
router.post('/:tendanhmuc', AuthController.KiemTraTokenAdmin, DanhMucController.ThemDanhMuc);

//Sửa danh mục
router.put('/:iddanhmuc/:tendanhmuc', AuthController.KiemTraTokenAdmin, DanhMucController.SuaDanhMuc);

//Xóa danh mục
router.delete('/:iddanhmuc', AuthController.KiemTraTokenAdmin, DanhMucController.XoaDanhMuc);


module.exports = router;
