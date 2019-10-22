var express = require('express');
var router = express.Router();
const api_helper = require('./API_helper');

const app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  api_helper.make_API_call('http://localhost:3001/sanPhams')
      .then(response => {
        var obj =  [];
      /*  var jsonSp = JSON.stringify(response);*/
        response.Items.forEach(function (item) {
          var it2 = {ID_SanPham:item.ID_SanPham, TenSanPham:item.TenSanPham, ID_DanhMuc:item.DanhMuc.ID_DanhMuc, TenDanhMuc:item.DanhMuc.TenDanhMuc,MoTa:item.MoTa,TiLeSale:item.TiLeSale, Avatar:item.Anh.Avatar,AvtDetail1:item.Anh.AvtDetail1,AvtDetail2:item.Anh.AvtDetail2,AvtDetail3:item.Anh.AvtDetail3,Ngay:item.NgayTao.Ngay,Thang:item.NgayTao.Thang,Nam:item.NgayTao.Nam,SoLuong:item.SoLuong,TrangThai:item.TrangThai};
      /*    var it = {ID_SanPham: item.ID_SanPham,TenSanPham: item.TenSanPham, ID_DanhMuc:item.DanhMuc.ID_DanhMuc, TenDanhMuc:item.DanhMuc.TenDanhMuc,MoTa:item.MoTa,TiLeSale:item.TiLeSale, Avatar:item.Anh.Avatar,AvtDetail1:item.Anh.AvtDetail1};*/
          obj.push(it2);
        });
        res.render('index.ejs', { title: 'Express', dataa: obj });
      })
      .catch(error => {
        res.send("Web server chưa được bật, không lấy được data "+error);
      });
});

module.exports = router;
