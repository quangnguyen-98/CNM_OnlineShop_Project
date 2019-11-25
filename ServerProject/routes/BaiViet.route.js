var express = require('express');
var router = express.Router();

//Khai báo conntroller
var BaiVietController = require('../controllers/BaiViet.controller');
var AuthController = require('../controllers/Auth.controller');
var BaiVietValidate = require('../Validator/BaiViet.validate');

//Route (Web/api/BaiViets/)

//Lấy tất cả bài viết
router.get('/', BaiVietController.LayTatCaBaiViet);

//Lấy bài viết theo số trang
router.get('/:pagenumber',BaiVietController.LayBaiVietTheoSoTrang);

//Lấy bài viết theo tên
router.get('/timtheoid/:idbaiviet',BaiVietController.LayBaiVietTheoID);

//Lấy bài viết theo tên
router.get('/timtheoten/:tenbaiviet',BaiVietController.LayBaiVietTheoTen);

//Tạo bài viết
router.post('/:tenbaiviet',  BaiVietValidate.KiemTraTrungTen, BaiVietController.ThemBaiViet);

//Sửa bài viết
router.put('/:idbaiviet/:tenbaiviet',  BaiVietController.SuaBaiViet);

//Xóa bài viết
router.delete('/:idbaiviet', BaiVietController.XoaBaiViet);


module.exports = router;
