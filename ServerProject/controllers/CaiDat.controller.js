var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const CustomFunction = require('../Config/CustomFunction');
const path = require('path');
const fs = require('fs');
module.exports = {
    LayTatCaCaiDat: function (req, res, next) {
        res.json(
            {
                SoSanPhamPMoiPage: global.SoSanPhamMoiPage,
                SoItemMoiPageQL: global.SoItemMoiPageQL,
                ThoiGianLogin: global.ThoiGianLogin,
                SecretKeyAdmin: global.SecretKeyAdmin
            }
        );
    },
    SuaSoSanPhamMoiTrang: function (req, res, next) {
        var value = req.query.thamso;
        global.SoSanPhamMoiPage = value;
        res.status(200).json(
            {
                status: "ok",
                message: "Thay đổi thành công !",
            }
        );

    },
    SuaSoItemMoiTrangQL: function (req, res, next) {
        var value = req.query.thamso;
        global.SoItemMoiPageQL = value;
        res.status(200).json(
            {
                status: "ok",
                message: "Thay đổi thành công !",
            }
        );
    },
    SuaThoiGianLogin: function (req, res, next) {
        var value = req.query.thamso;
        global.ThoiGianLogin = value;
        res.status(200).json(
            {
                status: "ok",
                message: "Thay đổi thành công !",
            }
        );
    },
    SuaSecrectKeyAdmin: function (req, res, next) {
        var value = req.query.thamso;
        global.SecretKeyAdmin = value;
        res.status(200).json(
            {
                status: "ok",
                message: "Thay đổi thành công !",
            }
        );
    },
    DoiMK: function (req, res, next) {
        var SecretKey = global.SecretKeyAdmin;
        var token = req.query.token;
        var matkhaucu = req.query.matkhaucu;
        var matkhaumoi = req.query.matkhaumoi;
        var nhaplaimatkhaumoi = req.query.nhaplaimatkhaumoi;
        var iduser;
        if(matkhaumoi != nhaplaimatkhaumoi){
            res.json({
                status: "fail",
                message: "Mật khẩu mới và nhập lại mật khẩu không trùng khớp !"
            });
        }
        else {
            jwt.verify(token, SecretKey, function (err, payload) {
                req.user = payload;
                if (payload) {
                    iduser = payload.payload.userId;

                    var paramTK = {
                        ProjectionExpression: "#yr, TaiKhoan.MatKhau",
                        TableName: "NguoiDung",
                        FilterExpression: "TaiKhoan.MatKhau =:n",
                        ExpressionAttributeNames: {
                            "#yr": "ID_NguoiDung",
                        },
                        ExpressionAttributeValues: {
                            ":n": matkhaucu
                        }
                    };
                    docClient.scan(paramTK, function (err, data) {
                        if (err) {
                            console.error(err);
                            res.json("Lỗi db !");
                        } else {
                            console.log("Thành công!");
                            if (data.Count != 1) {
                                res.json({
                                    status: "fail",
                                    message: "Mật khẩu cũ không đúng !"
                                });
                            } else {
                                var param = {
                                    TableName: 'NguoiDung',
                                    Key: {
                                        "ID_NguoiDung": iduser
                                    },
                                    UpdateExpression: "set TaiKhoan.MatKhau = :n",
                                    ExpressionAttributeValues: {
                                        ":n": matkhaumoi
                                    },
                                    ReturnValues: "UPDATED_NEW"
                                };
                                docClient.update(param, function (err, data) {
                                    if (err) {
                                        console.error(err);
                                        res.json({
                                            status: "fail",
                                            message: "Đổi mật khẩu thất bại "+err+"!"
                                        });
                                    } else {
                                        console.log("Thành công!");
                                        res.json({
                                            status: "ok",
                                            message: "Đổi mật khẩu thành công !"
                                        });
                                    }
                                });
                            }
                        }
                    });

                }
            });
        }


    }

}