var AWS = require("aws-sdk");
var configAWS = require("../Config/ConfigAWS");
var docClient = new AWS.DynamoDB.DocumentClient();
module.exports = {
    LayTatCaSanPham:function(req, res, next) {
        var param = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, TenSanPham, ID_DanhMMuc, ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
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
               /* res.end(JSON.stringify(data.Items.slice(0,2)));*/
                res.json(data);
            }
        });
    },
    LaySanPhamTheoID:function(req, res, next) {
        var idsp = parseInt(req.params.id) ;
        var param = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
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
    },
    LaySanPhamTheoTen:function(req, res, next) {
        var tensp = req.params.ten ;
        var param = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
            FilterExpression:"contains(TenSanPham, :n)",
           // attr1 = :val1 and attr2 = :val2 and (contains(attr3, :val3a) or contains(attr3, :val3b))
            ExpressionAttributeNames:{
                "#yr":"ID_SanPham",
            },
            ExpressionAttributeValues:{
                ":n": tensp
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
    },
    LaySanPhamTheoIdDanhMuc:function(req, res, next) {
        var iddm = parseInt(req.params.id) ;
        var param = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
            FilterExpression:"ID_DanhMuc = :n",
            ExpressionAttributeNames:{
                "#yr":"ID_SanPham",
            },
            ExpressionAttributeValues:{
                ":n": iddm
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
    },
    LaySanPhamTheoIdThuongHieu:function(req, res, next) {
        var iddm = parseInt(req.params.id) ;
        var param = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
            FilterExpression:"ID_ThuongHieu = :n",
            ExpressionAttributeNames:{
                "#yr":"ID_SanPham",
            },
            ExpressionAttributeValues:{
                ":n": iddm
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
    },
    LaySanPhamTheoIdDanhMucVaThuongHieu:function(req, res, next) {
        var iddm = parseInt(req.params.iddm);
        var idth = parseInt(req.params.idth);
        var param = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
            FilterExpression:"ID_DanhMuc = :n and ID_ThuongHieu = :m",
            ExpressionAttributeNames:{
                "#yr":"ID_SanPham",
            },
            ExpressionAttributeValues:{
                ":n": iddm,
                ":m":idth
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
    },
    LaySanPhamTheoKhoangGia:function(req, res, next) {
        var tu = parseInt(req.params.tu);
        var den = parseInt(req.params.den);
        var param = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
            FilterExpression:"Gia between :n and :m",
            ExpressionAttributeNames:{
                "#yr":"ID_SanPham",
            },
            ExpressionAttributeValues:{
                ":n": tu,
                ":m":den
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
    },
    LaySanPhamTheoSoTrang:function(req, res, next) {
        var n = parseInt(req.params.pagenumber) ;
        var x=3;
        var begin =(n-1)*x;
        var end = (n-1)*x +x;
        var param = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
            ExpressionAttributeNames:{
                "#yr":"ID_SanPham",
            },
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                var soTrang;
                var count = data.Count/x;
              /*  var a = JSON.parse(data);*/
              /*  for(var i = 0; i < data.Items; ++i){
                    if(array[i] == 2)
                        count++;
                }*/
              /*  soTrang = count/x;*/


                /*res.set({ 'content-type': 'application/json; charset=utf-8' });*/
                res.json(
                    {
                        SanPham: data.Items.slice(begin,end),
                        SoTrang: Math.ceil(count)
                    }
                );

            }
        });
    },
};