var express = require('express');
var router = express.Router();

//Khai báo conntroller
var BaiVietController = require('../controller/BaiViet.controller');

//Hiển thị chi tiết bài viết
router.get('/:id', BaiVietController.HienThiChiTietBaiViet);



module.exports = router;
