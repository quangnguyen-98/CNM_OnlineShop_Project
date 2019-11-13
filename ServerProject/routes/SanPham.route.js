var express = require('express');
var router = express.Router();
var app = express();

//Khai báo aws-sdk
var AWS = require("aws-sdk");
var configAWS = require("../Config/ConfigAWS");
configAWS.KetNoiAWS();

var docClient = new AWS.DynamoDB.DocumentClient();

//Khai báo conntroller
var SanPhamController = require('../controllers/SanPham.controller');
var IndexController = require('../controllers/Index.controller');




//Lấy tất cả sản phẩm  (Web/api/SanPhams/)
router.get('/', SanPhamController.LayTatCaSanPham);

router.get('/:id', SanPhamController.LaySanPhamTheoID);

router.get('/ten/:ten', SanPhamController.LaySanPhamTheoTen);

router.get('/danhmuc/:id', SanPhamController.LaySanPhamTheoIdDanhMuc);

router.get('/thuonghieu/:id', SanPhamController.LaySanPhamTheoIdThuongHieu);

router.get('/danhmuc/:iddm/thuonghieu/:idth', SanPhamController.LaySanPhamTheoIdDanhMucVaThuongHieu);

router.get('/gia/:tu/:den', SanPhamController.LaySanPhamTheoKhoangGia);

router.get('/page/:pagenumber', SanPhamController.LaySanPhamTheoSoTrang);



module.exports = router;
