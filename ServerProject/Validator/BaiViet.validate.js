var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
const { check} = require('express-validator');
var CustomFunction = require('../Config/CustomFunction');
module.exports = {
    KiemTraTrungTen:function (req,res,next) {
        var tenBV = req.params.tenbaiviet;
        var param = {
            TableName: "BaiViet",
            ProjectionExpression:"#yr, TenTieuDe, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_BaiViet",
            },
            ExpressionAttributeValues:{
                ":n":false
            }
        };
        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Lỗi db !"
                });
            }
            else{
                console.log("Thành công!");
                var mangTrungTen =[];
                data.Items.forEach(function (item) {
                    if(item.TenTieuDe.Ten.toString().toLowerCase() == tenBV.toString().toLowerCase())
                        mangTrungTen.push(item.TenTieuDe.Ten);
                });
                if (mangTrungTen.length >= 1){
                    res.json({
                        status:"fail",
                        message:"Tên bài viết bị trùng, vui lòng đặt tên khác !",
                    });
                }
                else {
                    next();
                }
            }
        });
    },
    KiemTraTrungTenKhiSua:function (req,res,next) {
        var idBV = req.params.idbaiviet;
        var tenBV = req.params.tenbaiviet;
        var param = {
            TableName: "BaiViet",
            ProjectionExpression:"#yr, TenTieuDe, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_BaiViet",
            },
            ExpressionAttributeValues:{
                ":n":false
            }
        };
        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Lỗi db !"
                });
            }
            else{
                console.log("Thành công !");
                var mangTrungTen =[];
                data.Items.forEach(function (item) {
                    if( item.ID_BaiViet != idBV && item.TenTieuDe.Ten.toString().toLowerCase() == tenBV.toString().toLowerCase() )
                        mangTrungTen.push(item.TenTieuDe.Ten);
                });
                if (mangTrungTen.length >= 1){
                    res.json({
                        status:"fail",
                        message:"Tên bài viết bị trùng, vui lòng đặt tên khác !",
                    });
                }
                else {
                    next();
                }
            }
        });
    },
    Validate_ThongTinBaiViet: function (req, res, next) {
        var tenBV = req.params.tenbaiviet;
        var noiDungBV = req.body.noidungbaiviet;

        if (tenBV.length == 0 || noiDungBV.length == 0 ) {
            res.json({
                status: "fail",
                message: "Tên và nội dung bài viết không được trống !"
            });
            return;

        }
        else {
            next();
        }
    },
};

