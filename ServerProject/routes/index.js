var express = require('express');
var router = express.Router();
const app = express();
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId:"quang1",
  secretAccessKey:"quang2"
});

var docClient = new AWS.DynamoDB.DocumentClient();


/* GET home page. */
router.get('/', function(req, res, next) {
  var param = {
    TableName: "SanPham",
    ProjectionExpression:"#yr, TenSanPham",
    ExpressionAttributeNames:{
      "#yr":"ID_SanPham",
    }
  };

  let list = [
    {ID_SanPham: 'PHP',TenSanPham:'PHP1'},
    {ID_SanPham: 'Ruby',TenSanPham:'Ruby1'},
    {ID_SanPham: 'Java',TenSanPham:'Java1'},
    {ID_SanPham: 'Python',TenSanPham:'Python1'},
    {ID_SanPham: 'dotNet',TenSanPham:'dotNet1'},
    {ID_SanPham: 'C#',TenSanPham:'c#1'},
    {ID_SanPham: 'Swift',TenSanPham:'Swift1'},
    {ID_SanPham: 'Pascal',TenSanPham:'Passcal1'},
  ]
  docClient.scan(param,function (err,data) {
    if (err) {
      console.error(err);
      res.end();
    }
    else{
      var obj =  [];
      data.Items.forEach(function (item) {
        var it = {ID_SanPham: item.ID_SanPham,TenSanPham: item.TenSanPham}
        obj.push(it);
      });
      console.log("Thành công!");
      res.render('index.ejs', { title: 'Express', dataa: obj });
    }
  });
});

router.get('/sanPhams', function(req, res, next) {
  var param = {
    TableName: "SanPham",
    ProjectionExpression:"#yr, TenSanPham, DanhMuc.ID_DanhMMuc, DanhMuc.TenDanhMuc, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, Anh.AvtDetail3, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
    ExpressionAttributeNames:{
      "#yr":"ID_SanPham",
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
