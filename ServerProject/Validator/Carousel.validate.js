var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
const { check} = require('express-validator');
var _ = require('lodash');
var CustomFunction = require('../Config/CustomFunction');
module.exports = {
    KiemTraTrungTen:function (req,res,next) {
        var tenCRS = req.body.tenCarousel;
        var param = {
            TableName: "Carousel",
            ProjectionExpression:"#yr, TenCarousel, TrangThaiXoa",
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
                res.json({
                    status:"fail",
                    message:"Lỗi db !"
                });
            }
            else{
                console.log("Thành công!");
                var mangTrungTen =[];
                data.Items.forEach(function (item) {
                    if(item.TenCarousel.Ten.toString().toLowerCase() == tenCRS.toString().toLowerCase())
                        mangTrungTen.push(item.TenCarousel.Ten);
                });
                if (mangTrungTen.length >= 1){
                    res.json({
                        status:"fail",
                        message:"Tên danh mục bị trùng, vui lòng đặt tên khác !",
                    });
                }
                else {
                    next();
                }
            }
        });
    },
    ValidateCarousel:function (req,res,next) {
        var tenCRS = req.body.tenCarousel;
        var linkAnhCRS = req.body.linkAnh;
        var linkBaiVietCRS = req.body.linkBaiViet;

        if(tenCRS.length == 0 || linkBaiVietCRS.length == 0 || linkAnhCRS.length == 0){
            res.json({
                status: "fail",
                message: "Vui lòng nhập đầy đủ thông tin carousel !"
            });
            return;
        }
        else {
            next();
        }
    },
};

