const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const CustomFunction = require('../Config/CustomFunction');
const ids = require('short-id');
module.exports = {
    LayTatCaMaGiamGia: function (req, res, next) {
        var n = parseInt(req.params.pagenumber) ;
        var param = {
            TableName: "MaGiamGia",
            ProjectionExpression:"#yr, TenMaGiamGia, TiLeSale, SoLuong, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_MaGiamGia",
            },
            ExpressionAttributeValues:{
                ":n":false
            }
        };
        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                var soTrang;
                var count = data.Count/global.SoItemMoiPageQL;
                res.json(
                    {
                        MaGiamGia: data.Items,
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage:global.SoItemMoiPageQL
                    }
                );
            }
        });
    },
    LayMaGiamGiaTheoSoTrang:function(req,res,next){
        var soItemMoiPageQL = parseInt(global.SoItemMoiPageQL) ;
        var n = parseInt(req.params.pagenumber) ;
        var begin =(n-1)* soItemMoiPageQL;
        var end = (n-1)*soItemMoiPageQL +soItemMoiPageQL;
        var param = {
            TableName: "MaGiamGia",
            ProjectionExpression:"#yr, TenMaGiamGia, TiLeSale, SoLuong, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_MaGiamGia",
            },
            ExpressionAttributeValues:{
                ":n":false
            }
        };
        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                var soTrang;
                var count = data.Count/soItemMoiPageQL;
                res.json(
                    {
                        MaGiamGia: data.Items.slice(begin,end),
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage:soItemMoiPageQL
                    }
                );
            }
        });
    },
    LayMaGiamGiaTheoTen:function(req,res,next){
        var tenMaGiamGia = CustomFunction.BoDau(req.params.tenmagiamgia.toString().toUpperCase());
        var param = {
            TableName: "MaGiamGia",
            ProjectionExpression:"#yr, TenMaGiamGia, TiLeSale, SoLuong, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n and contains(TenMaGiamGia, :m)",
            ExpressionAttributeNames:{
                "#yr":"ID_MaGiamGia",
            },
            ExpressionAttributeValues:{
                ":n":false,
                ":m":tenMaGiamGia
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
    ThemMaGiamGia: function (req, res, next) {
        var tenMGG =  CustomFunction.BoDau(req.params.tenmagiamgia.toLowerCase()).toUpperCase().replace(/\s+/g, '');
        var tiLeSale = parseInt(req.params.tilesale) ;
        var soLuong = parseInt(req.params.soluong) ;
        var idMGG = ids.generate();
        var paramMGG = {
            TableName: "MaGiamGia",
            Item: {
                "ID_MaGiamGia": idMGG,
                "TenMaGiamGia": tenMGG,
                "TiLeSale": tiLeSale,
                "SoLuong":soLuong,
                "TrangThaiXoa": false
            }
        };

        docClient.put(paramMGG,function (err,data) {
            if (err) {
                console.error(err);
                return res.json({
                    status:"fail",
                    message:"Lỗi hệ thống !"
                });

            }
            else{
                console.log("Thành công!");
                return res.json({
                    status:"ok",
                    message:"Tạo mã giảm giá thành công !",
                    idMGG:idMGG,
                    tenMGG:tenMGG,
                    tiLeSale:tiLeSale,
                    soLuong:soLuong

                });
            }
        });
    },
    SuaMaGiamGia: function (req, res, next) {
        var idMGG = req.params.idmagiamgia;
        // var tenMGG = CustomFunction.BoDau(req.params.tenmagiamgia.toUpperCase().replace(/\s+/g, ''));
        var tiLeSale = parseInt(req.params.tilesale);
        var soLuong = parseInt(req.params.soluong) ;
        var param = {
            TableName:'MaGiamGia',
            Key:{
                "ID_MaGiamGia": idMGG
            },
            UpdateExpression: "set  TiLeSale = :n, SoLuong = :m",
            ExpressionAttributeValues:{
                ":n":tiLeSale,
                ":m":soLuong
            },
            ReturnValues:"UPDATED_NEW"
        };


        docClient.update(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Sửa mã giảm giá thất bại !",
                    idMGG:idMGG
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Sửa mã giảm giá thành công !",
                    idMGG:idMGG,
                    tiLeSale:tiLeSale,
                    SoLuong:soLuong
                });
            }
        });
    },
    XoaMaGiamGia: function (req, res, next) {
        var idMGG = req.params.idmagiamgia;
        var param = {
            TableName:'MaGiamGia',
            Key:{
                "ID_MaGiamGia": idMGG
            },
            UpdateExpression: "set TrangThaiXoa = :n",
            ExpressionAttributeValues:{
                ":n": true
            },
            ReturnValues:"UPDATED_NEW"
        };

        docClient.update(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Xóa mã giảm giá thất bại !",
                    idMGG:idMGG
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Xóa mã giảm giá thành công !",
                    idMGG:idMGG
                });
            }
        });
    }
}