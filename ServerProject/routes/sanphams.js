var express = require('express');
var router = express.Router();
const app = express();
var AWS = require("aws-sdk");
var configAWS = require("../Database/ConfigAWS");

configAWS.KetNoiAWS();
/*configAWS.KetNoiAWSLocal();*/

var docClient = new AWS.DynamoDB.DocumentClient();


/* GET home page. */


router.get('/', function(req, res, next) {
    var idsp = parseInt(req.query.id) ;
    var param = {
        TableName: "SanPham",
        ProjectionExpression:"#yr, TenSanPham, DanhMuc.ID_DanhMMuc, DanhMuc.TenDanhMuc, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, Anh.AvtDetail3, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
        FilterExpression:"#yr = :n",
        ExpressionAttributeNames:{
            "#yr":"ID_SanPham",
        },
        ExpressionAttributeValues:{
            ":n": idsp
        }
    };

    docClient.scan(param,function (err,data) {
        if (err) {
            console.error(err);
            res.end();
        }
        else{
            console.log("Thành công!");
            res.json(data);
        }
    });
});

module.exports = router;
