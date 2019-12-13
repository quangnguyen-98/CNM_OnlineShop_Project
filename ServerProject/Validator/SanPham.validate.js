var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
const {check} = require('express-validator');
var _ = require('lodash');
var CustomFunction = require('../Config/CustomFunction');
module.exports = {
    KiemTraTrungTen: function (req, res, next) {
        var tenSP = req.params.tensanpham;
        var param = {
            TableName: "SanPham",
            ProjectionExpression: "#yr, TenSanPham, TrangThaiXoa",
            FilterExpression: "TrangThaiXoa =:n",
            ExpressionAttributeNames: {
                "#yr": "ID_SanPham",
            },
            ExpressionAttributeValues: {
                ":n": false
            }
        };
        docClient.scan(param, function (err, data) {
            if (err) {
                console.error(err);
                res.json({
                    status: "fail",
                    message: "Lỗi db !"
                });
            } else {
                console.log("Thành công!");
                var mangTrungTen = [];
                data.Items.forEach(function (item) {
                    if (item.TenSanPham.Ten.toString().toLowerCase() == tenSP.toString().toLowerCase())
                        mangTrungTen.push(item.TenSanPham.Ten);
                });
                if (mangTrungTen.length >= 1) {
                    res.json({
                        status: "fail",
                        message: "Tên sản phẩm bị trùng, vui lòng đặt tên khác !",
                    });
                } else {
                    next();
                }
            }
        });
    },
    ValidateSanPham: function (req, res, next) {
        var NoiSanXuat = req.body.NoiSanXuat;
        var CheDoBaoHanh = req.body.CheDoBaoHanh;
        var PhuKienTheoKem = req.body.PhuKienTheoKem;
        var Anh1 = req.body.Anh1;
        var Anh2 = req.body.Anh2;
        var Anh3 = req.body.Anh3;
        var Gia = req.body.Gia;
        var TiLeSale = req.body.TiLeSale;
        var TongQuan = req.body.TongQuan;
        var ChiTiet = req.body.ChiTiet;

        if (NoiSanXuat.length == 0 || CheDoBaoHanh.length == 0 || PhuKienTheoKem.length == 0 || Anh1.length == 0 || Anh2.length == 0 || Anh3.length == 0 || Gia.length == 0 || TiLeSale.length == 0 || TongQuan.length == 0 || ChiTiet.length == 0) {
            res.json({
                status: "fail",
                message: "Vui lòng nhập đầy đủ thông tin của sản phẩm trước khi lưu !"
            });
            return;

        } else if (/^[0-9]*$/.test(NoiSanXuat) == true || /^[0-9]*$/.test(CheDoBaoHanh) == true || /^[0-9]*$/.test(PhuKienTheoKem) == true) {
            res.json({
                status: "fail",
                message: "Nơi sản xuất, chế độ bảo hành và phụ kiện đi kèm không được là số !"
            });
            return;


        }
        else if (parseInt(TiLeSale) < 0 || parseInt(TiLeSale) > 100 || parseInt(Gia) < 1) {
            res.json({
                status: "fail",
                message: "Giá không được bé hơn 1, tỉ lệ sale phải nằm trong khoảng [0-100] !"
            });
            return;
        } else if (/^[0-9]*$/.test(TiLeSale) == false || /^[0-9]*$/.test(Gia) == false) {
            res.json({
                status: "fail",
                message: "Giá hoặc tỉ lệ sale phải là số !"
            });
            return;
        } else {
            next();
        }
    },
    Validate_ThemSize: function (req, res, next) {
        var soLuong = req.body.soluong;
        var tenSize = req.body.tensize;
        if (tenSize.length == 0 || soLuong.length == 0) {
            res.json({
                status: "fail",
                message: "Thông tin size không được trống !"
            });
            return;
        } else if (parseInt(soLuong) < 1) {
            res.json({
                status: "fail",
                message: "Số lượng size không được bé hơn 1 !"
            });
            return;
        } else if (/^[0-9]*$/.test(soLuong) == false) {
            res.json({
                status: "fail",
                message: "Số lượng của size phải là số !"
            });
            return;
        } else {
            next();
        }
    },
    Validate_SuaSize: function (req, res, next) {
        var soLuong = req.body.soluong;
        var tenSize = req.body.tensize;
        if (parseInt(soLuong) < 1) {
            res.json({
                status: "fail",
                message: "Số lượng size không được bé hơn 1 !"
            });
            return;
        } else if (/^[0-9]*$/.test(soLuong) == false) {
            res.json({
                status: "fail",
                message: "Số lượng của size phải là số !"
            });
            return;
        } else {
            next();
        }
    }
};

