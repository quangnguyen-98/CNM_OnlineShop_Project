var express = require('express');
var router = express.Router();

//Khai báo conntroller
var FooterController = require('../controllers/Footer.controller');



//Lấy tất cả liên kết footer  (Web/api/Footers/)
/*router.get('/', CarouselController.LayTatCaFooter);*/

router.get('/TT', FooterController.LayFooterTT);

router.get('/CSKH', FooterController.LayFooterCSKH);

router.get('/FAQ', FooterController.LayFooterFAQ);

router.get('/CH', FooterController.LayFooterCH);

router.get('/Menu', FooterController.LayFooterMenu);

router.get('/timtheoten/tencuahang', FooterController.LayCuaHangTheoTen);

router.put('/:idfooter/:lienket', FooterController.SuaMenuFooter);

router.get('/laytatcacuahang', FooterController.LayTatCaCuaHang);

router.get('/laycuahangtheotrang', FooterController.LayCuaHangTheoSoTrang);

router.post('/:tencuahang', FooterController.ThemCuaHang);

router.delete('/:idcuahang', FooterController.XoaCuaHang);




module.exports = router;
