var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
const { check} = require('express-validator');
var _ = require('lodash');
var CustomFunction = require('../Config/CustomFunction');
module.exports = {
    ValidateMGG:[
        check('username','khong duoc trong').not().isEmpty(),
        check('password','it nhat 5 chu').isLength({ min: 5,max:10 })
    ],
    KiemTraTrungTen:function (req,res,next) {
        var tenMGG = CustomFunction.BoDau(req.params.tenmagiamgia.toLowerCase()).toUpperCase().replace(/\s+/g, '')
        var param = {
            TableName: "MaGiamGia",
            ProjectionExpression:"#yr, TenMaGiamGia, TrangThaiXoa",
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
                res.json({
                    status:"fail",
                    message:"Lỗi db !"
                });
            }
            else{
                console.log("Thành công!");
                var mangTrungTen =[];
                data.Items.forEach(function (item) {
                    if(item.TenMaGiamGia.toString() == tenMGG.toString())
                        mangTrungTen.push(item.TenMaGiamGia.Ten);
                });
                if (mangTrungTen.length >= 1){
                    res.json({
                        status:"fail",
                        message:"Tên mã giảm giá bị trùng, vui lòng đặt tên khác !",
                    });
                }
                else {
                    next();
                }
            }
        });
    }
};

