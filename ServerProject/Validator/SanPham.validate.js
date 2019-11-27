var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
const { check} = require('express-validator');
var _ = require('lodash');
var CustomFunction = require('../Config/CustomFunction');
module.exports = {
    ValidateSP:[
        check('username','khong duoc trong').not().isEmpty(),
        check('password','it nhat 5 chu').isLength({ min: 5,max:10 })
    ],
    KiemTraTrungTen:function (req,res,next) {
        var tenSP = req.params.tensanpham;
        var param = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, TenSanPham, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_SanPham",
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
                    if(item.TenSanPham.Ten.toString().toLowerCase() == tenSP.toString().toLowerCase())
                        mangTrungTen.push(item.TenSanPham.Ten);
                });
                if (mangTrungTen.length >= 1){
                    res.json({
                        status:"fail",
                        message:"Tên sản phẩm bị trùng, vui lòng đặt tên khác !",
                    });
                }
                else {
                    next();
                }
            }
        });
    }
};

