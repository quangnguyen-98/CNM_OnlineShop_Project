var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var jwt = require('jsonwebtoken');
var secretOrKey = require('../Config/Key');
const { validationResult } = require('express-validator');
var idTK ;
var tokenTK;
module.exports = {
    KiemTraDangNhap: function (req, res, next) {
        //VaLidate data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status:"fail",
                errors: errors.array()
            });
        }
        //Kiểm tra tk
        var username = req.params.username;
        var password = req.params.password;
        var paramTK = {
            TableName: "NguoiDung",
            ProjectionExpression:"#yr, TaiKhoan.ID_TaiKhoan, TaiKhoan.MatKhau",
            FilterExpression:"TaiKhoan.ID_TaiKhoan = :n and TaiKhoan.MatKhau = :m",
            ExpressionAttributeNames:{
                "#yr":"ID_NguoiDung",
            },
            ExpressionAttributeValues:{
                ":n": username,
                ":m": password
            }
        };
        //Tạo token
        docClient.scan(paramTK,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                if(data.Count == 1){
                    var payload ={
                        userId : data.Items[0].ID_NguoiDung
                    };
                    var token = jwt.sign({payload}, secretOrKey.toString(), { expiresIn: 60*10 });
                    /*res.cookie('token', token.toString(), {maxAge : 120});*/
                    res.cookie('token', token.toString());
                    idTK = data.Items[0].ID_NguoiDung.toString();
                    tokenTK = token.toString();
                    //Trả về json
                    res.json({
                        status:"ok",
                        userId:data.Items[0].ID_NguoiDung,
                        token:token
                    });
                    return;
                }else {
                    res.json({
                        status:"fail",
                    });
                }
            }
        });
    },
    KiemTraToken: function (req, res, next) {
        try {
            var token = req.params.token;
            jwt.verify(token, secretOrKey.toString(), function(err, payload) {
                if(payload) {
                    req.user = payload;
                    next();
                } else {
                    // Nếu token tồn tại nhưng không hợp lệ, server sẽ response status code 401 với msg bên dưới
                    res.status(401).send('Unauthorized');
                }
            });
        } catch(err) {
            res.status(401).send('No token provided'+err);
        }
    },
    KiemTraRoute:function (req, res, next) {
        if(req.user) {
            return next();
        }
        // Ngược lại server sẽ response status code 401 với msg bên dưới
        res.status(401).send('Unauthorized');
    },
    TraKetQuaXacThuc:function (req, res, next) {
        if(req.user) {
            res.json({
               status:"ok"
            });
        }
        res.json({
            status:"fail"
        });
    }
}

function LuuTokenVaoDB() {
    //Lưu token vào db
    var paramsToken = {
        TableName:'NguoiDung',
        Key:{
            "ID_NguoiDung": idTK,
        },
        UpdateExpression: "set TaiKhoan.TokenND = :r",
        ExpressionAttributeValues:{
            ":r": tokenTK
        },
        ReturnValues:"UPDATED_NEW"
    };
    docClient.update(paramsToken, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}