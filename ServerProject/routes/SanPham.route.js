var express = require('express');
var router = express.Router();

//Khai báo conntroller
var SanPhamController = require('../controllers/SanPham.controller');
var AuthController = require('../controllers/Auth.controller')
//Lấy tất cả sản phẩm  (Web/api/SanPhams/)

router.get('/', SanPhamController.LayTatCaSanPham);

//Muốn thêm route cấp 1 thì phải thêm trước route này, không nó sẽ bị lộn tham số
router.get('/:id', SanPhamController.LaySanPhamTheoID);

router.get('/ten/:ten/:pagenumber', SanPhamController.LaySanPhamTheoTen);

/*router.get('/danhmuc/:id', SanPhamController.LaySanPhamTheoIdDanhMuc);

router.get('/thuonghieu/:id', SanPhamController.LaySanPhamTheoIdThuongHieu);*/

router.get('/danhmuc/:iddm/thuonghieu/:idth', SanPhamController.LaySanPhamTheoIdDanhMucVaThuongHieu);

router.get('/gia/:tu/:den/:pagenumber', SanPhamController.LaySanPhamTheoKhoangGia);

/*router.get('/page/:pagenumber', SanPhamController.LaySanPhamTheoSoTrang);*/

router.get('/:sorttype/:sortkey/:pagenumber', SanPhamController.LaySanPhamTheoSoTrang);


module.exports = router;
