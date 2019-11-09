var express = require('express');
var router = express.Router();
const app = express();
var AWS = require("aws-sdk");
var configAWS = require("../Config/ConfigAWS");

configAWS.KetNoiAWS();
/*configAWS.KetNoiAWSLocal();*/

var docClient = new AWS.DynamoDB.DocumentClient();

//Khai báo conntroller
var IndexController = require('../controllers/Index.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
      res.json('Well come to Web Service');
});


router.get('/api/getIndex',IndexController.LayTatCaSanPham_DanhMuc_ThuongHieu);


module.exports = router;
