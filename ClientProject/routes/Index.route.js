var express = require('express');
var router = express.Router();

//Khai báo conntroller
var IndexController = require('../controller/Index.controller');

//Route Index (Web/)

//Trang chủ
router.get('/', IndexController.LayDuLieuTuAPITraVeView);



module.exports = router;
