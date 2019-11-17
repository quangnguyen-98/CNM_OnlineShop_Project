var express = require('express');
var router = express.Router();

//Khai báo conntroller
var IndexController = require('../controller/Index.controller');

/* GET home page. */
router.get('/', IndexController.LayDuLieuTuAPITraVeView);



module.exports = router;
