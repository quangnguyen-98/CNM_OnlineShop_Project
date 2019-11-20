var express = require('express');
var router = express.Router();

//Khai báo conntroller
var ThuongHieuController = require('../controllers/Thuonghieu.controller');
var AuthController = require('../controllers/Auth.controller');

//Lấy tất cả thương hiệu  (Web/api/ThuongHieus/)
router.get('/', AuthController.KiemTraTokenAdmin, ThuongHieuController.LayTatCaThuongHieu);

//Tạo danh mục
router.post('/:tenthuonghieu', ThuongHieuController.ThemThuongHieu);

//Sửa danh mục
router.put('/:idthuonghieu/:tenthuonghieu', ThuongHieuController.SuaThuongHieu);

//Xóa danh mục
router.delete('/:idthuonghieu', ThuongHieuController.XoaThuongHieu);


module.exports = router;
