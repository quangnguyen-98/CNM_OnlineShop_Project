var express = require('express');
var router = express.Router();

//Khai báo conntroller
var IndexController = require('../controllers/Index.controller');

// Về trang chủ
router.get('/', function(req, res, next) {
      res.json('Well come to Web Service');
});


router.get('/api/getIndex/:pagenumber',IndexController.LayTatCaSanPham_DanhMuc_ThuongHieu);

module.exports = router;
