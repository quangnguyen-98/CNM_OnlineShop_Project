var express = require('express');
var router = express.Router();

//Khai báo conntroller
var ThuongHieuController = require('../controllers/Thuonghieu.controller');
var AuthController = require('../controllers/Auth.controller');
var ThuongHieuValidate = require('../Validator/ThuongHieu.validate');

//Route  (Web/api/ThuongHieus/)

//Lấy tất cả thương hiệu
router.get('/',  ThuongHieuController.LayTatCaThuongHieu);

//Lấy thương hiệu theo số trang
router.get('/:pagenumber',ThuongHieuController.LayThuongHieuTheoSoTrang);

//Lấy thương hiệu theo tên
router.get('/timtheoten/:tenthuonghieu',ThuongHieuController.LayThuongHieuTheoTen);

//Tạo danh mục
router.post('/:tenthuonghieu', AuthController.KiemTraTokenAdmin, ThuongHieuValidate.KiemTraTrungTen, ThuongHieuController.ThemThuongHieu);

//Sửa danh mục
router.put('/:idthuonghieu/:tenthuonghieu', AuthController.KiemTraTokenAdmin, ThuongHieuValidate.KiemTraTrungTenKhiSua, ThuongHieuController.SuaThuongHieu);

//Xóa danh mục
router.delete('/:idthuonghieu', AuthController.KiemTraTokenAdmin, ThuongHieuController.XoaThuongHieu);


module.exports = router;
