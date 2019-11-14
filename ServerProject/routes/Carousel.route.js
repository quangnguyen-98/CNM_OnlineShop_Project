var express = require('express');
var router = express.Router();
var app = express();

//Khai báo conntroller
var CarouselController = require('../controllers/Carousel.controller');





//Lấy tất cả sản phẩm  (Web/api/Carousels/)
router.get('/', CarouselController.LayTatCaCarousel);





module.exports = router;
