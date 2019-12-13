var express = require('express');
var router = express.Router();

//Khai báo conntroller
var DanhMucController = require('../controllers/DanhMuc.controller');
var AuthController = require('../controllers/Auth.controller');
var DanhMucValidate = require('../Validator/DanhMuc.validate');

//Route (Web/api/DanhMucs/)

//Lấy tất cả danh mục
router.get('/', DanhMucController.LayTatCaDanhMuc);

//Lấy danh mục theo số trang
router.get('/:pagenumber',DanhMucController.LayDanhMucTheoSoTrang);

//Lấy danh mục theo tên
router.get('/timtheoten/:tendanhmuc',DanhMucController.LayDanhMucTheoTen);

//Tạo danh mục
router.post('/:tendanhmuc', AuthController.KiemTraTokenAdmin, DanhMucValidate.KiemTraTrungTen, DanhMucController.ThemDanhMuc);

//Sửa danh mục
router.put('/:iddanhmuc/:tendanhmuc', AuthController.KiemTraTokenAdmin, DanhMucValidate.KiemTraTrungTenKhiSua, DanhMucController.SuaDanhMuc);

//Xóa danh mục
router.delete('/:iddanhmuc', AuthController.KiemTraTokenAdmin, DanhMucController.XoaDanhMuc);


module.exports = router;
