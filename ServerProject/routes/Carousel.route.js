var express = require('express');
var router = express.Router();

//Khai báo conntroller
var CarouselController = require('../controllers/Carousel.controller');





//Lấy tất cả carousel  (Web/api/Carousels/)
router.get('/', CarouselController.LayTatCaCarousel);





module.exports = router;
