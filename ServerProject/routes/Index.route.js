var express = require('express');
var router = express.Router();

//Khai báo conntroller
var IndexController = require('../controllers/Index.controller');

// Về trang chủ
router.get('/', function(req, res, next) {
      res.json('Well come to Web Service');
});


router.get('/api/getIndex/:pagenumber',IndexController.LayTatCaSanPham_DanhMuc_ThuongHieu);
router.get('/api/getIndex2',IndexController.LaySanPham);

router.get('/ckc', function (req,res) {
      res.cookie('dsad','dsadsadas', {maxAge : 120});
      res.json('cac');
});
router.get('/ckcc', function (req,res) {
     /* res.cookie('dsad','dsadsadas', {maxAge : 120});*/
      console.log(req.cookies);
      res.json(req.cookies);
});
module.exports = router;
