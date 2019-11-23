const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const CustomFunction = require('../Config/CustomFunction');
const ids = require('short-id');
const path = require('path');
const fs = require('fs');
const SoItemMoiPage =parseInt(fs.readFileSync(path.resolve(__dirname, "../Config/SoItemMoiPage_QuanLy.txt"))) ;
module.exports = {
    LayTatCaCarousel: function (req, res, next) {
        var n = parseInt(req.params.pagenumber) ;
      /*  var soItemMoiPage= fs.readFileSync(path.resolve(__dirname, "../Config/SoItemMoiPage_QuanLy.txt"));*/
        var param = {
            TableName: "Carousel",
            ProjectionExpression:"#yr, TenCarousel,LinkAnh,LinkBaiViet, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_Carousel",
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
                var count = data.Count/SoItemMoiPage;
                res.json(
                    {
                        Carousel: data.Items,
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage:SoItemMoiPage
                    }
                );
            }
        });
    },
    LayCarouselTheoSoTrang:function(req,res,next){
        var n = parseInt(req.params.pagenumber) ;
      /*  var soItemMoiPage= itemMoiPage;*/
        var begin =(n-1)*SoItemMoiPage;
        var end = (n-1)*SoItemMoiPage +SoItemMoiPage;
        var param = {
            TableName: "Carousel",
            ProjectionExpression:"#yr, TenCarousel,LinkAnh,LinkBaiViet, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_Carousel",
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
                var count = data.Count/SoItemMoiPage;
                res.json(
                    {
                        Carousel: data.Items.slice(begin,end),
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage:SoItemMoiPage
                    }
                );
            }
        });
    },
    LayCarouselTheoTen:function(req,res,next){
        var tenCarousel = CustomFunction.BoDau(req.params.tenCarousel.toString().toLowerCase())  ;
        var param = {
            TableName: "Carousel",
            ProjectionExpression:"#yr, TenCarousel,LinkAnh,LinkBaiViet, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n and contains(TenCarousel.TenKhongVietHoa, :m)",
            ExpressionAttributeNames:{
                "#yr":"ID_Carousel",
            },
            ExpressionAttributeValues:{
                ":n":false,
                ":m":tenCarousel
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
    ThemCarousel: function (req, res, next) {
        var tenCRS = req.params.tenCarousel;
        var linkAnhCRS = decodeURIComponent(req.params.linkAnh) ;
        var linkBaiVietCRS = decodeURIComponent(req.params.linkBaiViet);
        var idCRS = ids.generate();
        var paramCRS = {
            TableName: "Carousel",
            Item: {
                "ID_Carousel": idCRS,
                "TenCarousel": {
                    "Ten":tenCRS,
                    "TenKhongVietHoa": CustomFunction.BoDau(tenCRS.toLowerCase())
                },
                "LinkAnh":linkAnhCRS,
                "LinkBaiViet":linkBaiVietCRS,
                "TrangThaiXoa": false
            }
        };

        docClient.put(paramCRS,function (err,data) {
            if (err) {
                console.error(err);
                return res.json({
                    status:"fail",
                    message:"Lỗi hệ thống"
                });

            }
            else{
                console.log("Thành công!");
                return res.json({
                    status:"ok",
                    message:"Tạo danh mục thành công !",
                    idCRS:idCRS,
                    tenCRS:tenCRS,
                    linkAnhCRS:linkAnhCRS,
                    linkBaiVietCRS:linkBaiVietCRS
                });
            }
        });
    },
    SuaCarousel: function (req, res, next) {
        var idCRS = req.params.idCarousel;
        // var tenCRS = req.params.tenCarousel;
        var linkAnhCRS = atob(req.params.linkAnh.replace(/_/g, '/').replace(/-/g, '+'));
        var linkBaiVietCRS = atob(req.params.linkBaiViet.replace(/_/g, '/').replace(/-/g, '+'));
      /*  var tenKhongVietHoa = CustomFunction.BoDau(tenCRS.toLowerCase());*/

        var param = {
            TableName:'Carousel',
            Key:{
                "ID_Carousel": idCRS
            },
            UpdateExpression: "set LinkAnh = :n, LinkBaiViet = :m",
            ExpressionAttributeValues:{
                ":n": linkAnhCRS,
                ":m":linkBaiVietCRS
            },
            ReturnValues:"UPDATED_NEW"
        };


        docClient.update(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Sửa danh mục thất bại !",
                    idCRS:idCRS
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Sửa danh mục thành công !",
                    idCRS:idCRS,
                    linkAnhCRS:linkAnhCRS,
                    linkBaiVietCRS:linkBaiVietCRS
                });
            }
        });
    },
    XoaCarousel: function (req, res, next) {
        var idCRS = req.params.idCarousel;
        var param = {
            TableName:'Carousel',
            Key:{
                "ID_Carousel": idCRS
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
                    message:"Xóa danh mục thất bại !",
                    idCRS:idCRS
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Xóa danh mục thành công !",
                    idCRS:idCRS
                });
            }
        });
    }
}