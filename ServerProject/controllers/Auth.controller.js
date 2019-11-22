var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var jwt = require('jsonwebtoken');
var fs = require('fs');
const path = require("path");
const {validationResult} = require('express-validator');
var idTK;
var tokenTK;
module.exports = {
    KiemTraDangNhapAdmin: function (req, res, next) {

        //VaLidate data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: "fail",
                message: "Thông tin đầu vào không hợp lệ !"
            });
            return;
        }
        //Kiểm tra tk
        var username = req.params.username;
        var password = req.params.password;
        var paramTK = {
            TableName: "NguoiDung",
            ProjectionExpression: "#yr, TaiKhoan.ID_TaiKhoan, TaiKhoan.MatKhau, VaiTro",
            FilterExpression: "TaiKhoan.ID_TaiKhoan = :n and TaiKhoan.MatKhau = :m",
            ExpressionAttributeNames: {
                "#yr": "ID_NguoiDung",
            },
            ExpressionAttributeValues: {
                ":n": username,
                ":m": password
            }
        };
        //Tạo token
        docClient.scan(paramTK, function (err, data) {
            if (err) {
                console.error(err);
                res.status(500).json({
                    status: "fail",
                    message: "Lỗi server"
                });
                return;
            } else {
                console.log(data.Items[0].VaiTro);
                console.log("fdsfdsfdsfdsfdsfds");
                var vaitro = data.Items[0].VaiTro.toString();
                if (data.Count == 1 && vaitro == "AD") {
                    var check = req.query.check;
                    /*  var vaitro = req.query.vaitro;*/
                    var SecretKey = fs.readFileSync(path.resolve(__dirname, "../Config/SecretKeyAdmin.txt")).toString();
                    if (check == "yes") {
                        var payload = {
                            userId: data.Items[0].ID_NguoiDung,
                            vaiTro: vaitro
                        };
                        var token = jwt.sign({payload}, SecretKey);
                        res.cookie('token', token.toString());
                        idTK = data.Items[0].ID_NguoiDung.toString();
                        tokenTK = token.toString();
                        //Trả về json
                        res.status(200).json({
                            status: "ok",
                            message: "Đăng nhập thành công",
                            userId: data.Items[0].ID_NguoiDung,
                            token: token
                        });
                        return;
                    } else {
                        var ThoiGianLogin = parseInt(fs.readFileSync(path.resolve(__dirname, "../Config/ThoiGianLogin.txt")));
                        var payload = {
                            userId: data.Items[0].ID_NguoiDung,
                            vaiTro: vaitro
                        };
                        var token = jwt.sign({payload}, SecretKey, {expiresIn: 60 * ThoiGianLogin});
                        res.cookie('token', token.toString());
                        idTK = data.Items[0].ID_NguoiDung.toString();
                        tokenTK = token.toString();
                        //Trả về json
                        res.status(200).json({
                            status: "ok",
                            message: "Đăng nhập thành công",
                            userId: data.Items[0].ID_NguoiDung,
                            token: token
                        });
                        return;
                    }

                } else {
                    res.status(400).json({
                        status: "fail",
                        message: "Sai tài khoản hoặc mật khẩu !",
                    });
                    return;
                }
            }
        });
    },
    KiemTraTokenAdmin: function (req, res, next) {
        try {
            var SecretKey = fs.readFileSync(path.resolve(__dirname, "../Config/SecretKeyAdmin.txt")).toString();
            var token = req.query.token;
            jwt.verify(token, SecretKey, function (err, payload) {
                if (payload) {
                    req.user = payload;
                    if (payload.payload.vaiTro == "AD") {
                        next();
                    }
                } else {
                    res.status(400).json({
                        status: "fail",
                        message: 'Token không hợp lệ'
                    });
                    return;
                }
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Lỗi:' + err
            });
            return;
        }
    },
    KiemTraRoute: function (req, res, next) {
        if (req.user) {
            return next();
        }
        res.status(400).send({
            status: "fail",
            message: 'Xác thực không thành công !'
        });
        return;
    },
    TraKetQuaXacThuc: function (req, res, next) {
        if (req.user) {
            res.status(200).json({
                status: "ok",
                message: 'Xác thực thành công !'
            });
            return;
        } else {
            res.status(400).json({
                status: "fail",
                message: 'Xác thực không thành công !'
            });
            return;
        }

    }
}
