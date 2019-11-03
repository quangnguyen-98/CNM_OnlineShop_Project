var express = require('express');
var router = express.Router();
const api_helper = require('./API_helper');
var sanPham = require("../models/SanPham");
const app = express();


//Khai báo conntroller
var IndexController = require('../controller/Index.controller');

/* GET home page. */
router.get('/', IndexController.LayDuLieuTuAPITraVeView);

module.exports = router;
