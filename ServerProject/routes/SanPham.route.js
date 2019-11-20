var express = require('express');
var router = express.Router();

//Khai báo conntroller
var SanPhamController = require('../controllers/SanPham.controller');
var AuthController = require('../controllers/Auth.controller')
//Lấy tất cả sản phẩm  (Web/api/SanPhams/)

router.get('/',AuthController.KiemTraTokenAdmin, SanPhamController.LayTatCaSanPham);

//Muốn thêm route cấp 1 thì phải thêm trước route này, không nó sẽ bị lộn tham số
router.get('/:id', SanPhamController.LaySanPhamTheoID);

router.get('/ten/:ten/:pagenumber/ten', SanPhamController.LaySanPhamTheoTen);

router.get('/gia/:tu/:den/:pagenumber', SanPhamController.LaySanPhamTheoKhoangGia);

router.get('/:sorttype/:sortkey/:pagenumber', SanPhamController.LaySanPhamTheoSoTrang);


module.exports = router;
