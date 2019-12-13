var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
const { check} = require('express-validator');
var _ = require('lodash');
var CustomFunction = require('../Config/CustomFunction');
module.exports = {
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
    },
    ValidateMaGiamGia:function (req,res,next) {
        var tenMGG =  CustomFunction.BoDau(req.params.tenmagiamgia.toLowerCase()).toUpperCase().replace(/\s+/g, '');
        var tiLeSale = parseInt(req.params.tilesale) ;
        var soLuong = parseInt(req.params.soluong) ;

        if(tenMGG.length == 0 || tiLeSale.length == 0 || soLuong.length == 0  ){
            res.json({
                status: "fail",
                message: "Vui lòng nhập đầy đủ thông tin mã giảm giá trước khi lưu !"
            });
            return;
        }else if(parseInt(tiLeSale) <0 || parseInt(tiLeSale) >100 || parseInt( soLuong)<0) {
            res.json({
                status: "fail",
                message: "Số lượng không được bé hơn 0, tỉ lệ sale phải nằm trong khoảng [0-100] !"
            });
            return;
        }
        else if(/^[0-9]*$/.test(soLuong) == false  || /^[0-9]*$/.test(tiLeSale) == false){
            res.json({
                status: "fail",
                message: "Giá hoặc số lượng phải là số !"
            });
            return;
        }
        else {
            next();
        }
    },
    ValidateMaGiamGiaKhiSua:function (req,res,next) {
        var tiLeSale = parseInt(req.params.tilesale) ;
        var soLuong = parseInt(req.params.soluong) ;

        if( tiLeSale.length == 0 || soLuong.length == 0  ){
            res.json({
                status: "fail",
                message: "Vui lòng nhập đầy đủ thông tin mã giảm giá trước khi lưu !"
            });
            return;
        }else if(parseInt(tiLeSale) <0 || parseInt(tiLeSale) >100 || parseInt( soLuong)<0) {
            res.json({
                status: "fail",
                message: "Số lượng không được bé hơn 0, tỉ lệ sale phải nằm trong khoảng [0-100] !"
            });
            return;
        }
        else if(/^[0-9]*$/.test(soLuong) == false  || /^[0-9]*$/.test(tiLeSale) == false){
            res.json({
                status: "fail",
                message: "Giá hoặc số lượng phải là số !"
            });
            return;
        }
        else {
            next();
        }
    }
};

