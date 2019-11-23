var express = require('express');
var router = express.Router();

//Khai báo conntroller
var CarouselController = require('../controllers/Carousel.controller');
var AuthController = require('../controllers/Auth.controller');
var CarouselValidate = require('../Validator/Carousel.validate');


//Route (Web/api/Carousels/)
//Lấy tất cả carousel
router.get('/', CarouselController.LayTatCaCarousel);

//Lấy carousel theo số trang
router.get('/:pagenumber',CarouselController.LayCarouselTheoSoTrang);

//Lấy carousel theo tên
router.get('/timtheoten/:tenCarousel',CarouselController.LayCarouselTheoTen);

//Tạo carousel
router.post('/:tenCarousel/:linkAnh/:linkBaiViet',CarouselValidate.KiemTraTrungTen,  CarouselController.ThemCarousel);

//Sửa carousel
router.put('/:idCarousel/:linkAnh/:linkBaiViet',   CarouselController.SuaCarousel);

//Xóa carousel
router.delete('/:idCarousel',  CarouselController.XoaCarousel);

module.exports = router;




