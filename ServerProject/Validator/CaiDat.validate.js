var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
const { check} = require('express-validator');
var _ = require('lodash');
var CustomFunction = require('../Config/CustomFunction');
module.exports = {
    Validate_SecetKey: function (req, res, next) {
        var value = req.query.thamso;
        if (value.length == 0 ) {
            res.json({
                status: "fail",
                message: "Secet key không được trống !"
            });
            return;
        }
        else {
            next();
        }
    },
    Validate_SoSanPhamMoiTrang: function (req, res, next) {
        var value = req.query.thamso;
        if (value.length == 0 ) {
            res.json({
                status: "fail",
                message: "Số sản phẩm/trang không được trống !"
            });
            return;
        }
        else if (/^[0-9]*$/.test(value) == false) {
            res.json({
                status: "fail",
                message: "Số sản phẩm/trang phải là số !"
            });
            return;
        }
        else {
            next();
        }
    },
    Validate_MatKhau: function (req, res, next) {
        var matkhaucu = req.query.matkhaucu;
        var matkhaumoi = req.query.matkhaumoi;
        var nhaplaimatkhaumoi = req.query.nhaplaimatkhaumoi;
        if (matkhaucu.length == 0 || matkhaumoi.length == 0 || nhaplaimatkhaumoi.length == 0) {
            res.json({
                status: "fail",
                message: "Thông tin mật khẩu không được trống !"
            });
            return;
        }
        else {
            next();
        }
    },
    //Validat Footer
    Validate_CuaHang: function (req, res, next) {
        var tenCH = req.params.tencuahang;
        if (tenCH.length == 0 ) {
            res.json({
                status: "fail",
                message: "Địa chỉ cửa hàng không được trống !"
            });
            return;
        }
        else {
            next();
        }
    },
    Validate_Footer: function (req, res, next) {
        var idFT = req.params.idfooter;
        var link1 = req.body.lienket ;
        if (idFT.length == 0 || link1.length == 0 ) {
            res.json({
                status: "fail",
                message: "Link footer không được trống !"
            });
            return;
        }
        else {
            next();
        }
    },


};

