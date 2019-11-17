var express = require('express');
var router = express.Router();

//Khai báo conntroller
var CarouselController = require('../controllers/Footer.controller');



//Lấy tất cả liên kết footer  (Web/api/Footers/)
router.get('/', CarouselController.LayTatCaFooter);

router.get('/TT', CarouselController.LayFooterTT);

router.get('/CSKH', CarouselController.LayFooterCSKH);

router.get('/FAQ', CarouselController.LayFooterFAQ);

router.get('/CH', CarouselController.LayFooterCH);



module.exports = router;
