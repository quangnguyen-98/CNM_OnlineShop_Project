var express = require('express');
var router = express.Router();

//Khai báo conntroller
var MaGiamGiaController = require('../controllers/MaGiamGia.controller');
var AuthController = require('../controllers/Auth.controller');
var MaGiamGiaValidate = require('../Validator/MaGiamGia.validate');

//Route (Web/api/MaGiamGias/)

//Lấy tất cả mã giảm giá
router.get('/',  MaGiamGiaController.LayTatCaMaGiamGia);

//Lấy mã giảm giá theo số trang
router.get('/:pagenumber',MaGiamGiaController.LayMaGiamGiaTheoSoTrang);

//Lấy mã giảm giá theo tên
router.get('/timtheoten/:tenmagiamgia',MaGiamGiaController.LayMaGiamGiaTheoTen);

//Kiểm tra mã giảm giá có tồn tại không
router.post('/kiemtramgg',  MaGiamGiaController.KiemTraTonTaiMGG);

//Tạo mã giảm giá
router.post('/:tenmagiamgia/:tilesale/:soluong', AuthController.KiemTraTokenAdmin, MaGiamGiaValidate.KiemTraTrungTen, MaGiamGiaValidate.ValidateMaGiamGia, MaGiamGiaController.ThemMaGiamGia);

//Sửa mã giảm giá
router.put('/:idmagiamgia/:tilesale/:soluong', AuthController.KiemTraTokenAdmin, MaGiamGiaValidate.ValidateMaGiamGiaKhiSua, MaGiamGiaController.SuaMaGiamGia);

//Xóa mã giảm giá
router.delete('/:idmagiamgia', AuthController.KiemTraTokenAdmin, MaGiamGiaController.XoaMaGiamGia);


module.exports = router;
