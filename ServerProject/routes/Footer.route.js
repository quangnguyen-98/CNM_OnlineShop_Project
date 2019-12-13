var express = require('express');
var router = express.Router();

//Khai báo conntroller
var FooterController = require('../controllers/Footer.controller');
var AuthController = require('../controllers/Auth.controller');
var CaiDatValidate = require('../Validator/CaiDat.validate');


//Lấy tất cả liên kết footer  (Web/api/Footers/)
/*router.get('/', CarouselController.LayTatCaFooter);*/

router.get('/TT', FooterController.LayFooterTT);

router.get('/CSKH', FooterController.LayFooterCSKH);

router.get('/FAQ', FooterController.LayFooterFAQ);

router.get('/CH', FooterController.LayFooterCH);

router.get('/Menu', FooterController.LayFooterMenu);

router.get('/timtheoten/tencuahang', FooterController.LayCuaHangTheoTen);

router.put('/:idfooter', AuthController.KiemTraTokenAdmin, CaiDatValidate.Validate_Footer, FooterController.SuaMenuFooter);

router.get('/laytatcacuahang', FooterController.LayTatCaCuaHang);

router.get('/laycuahangtheotrang', FooterController.LayCuaHangTheoSoTrang);

router.post('/:tencuahang',AuthController.KiemTraTokenAdmin, CaiDatValidate.Validate_CuaHang, FooterController.ThemCuaHang);

router.delete('/:idcuahang',AuthController.KiemTraTokenAdmin, FooterController.XoaCuaHang);




module.exports = router;
