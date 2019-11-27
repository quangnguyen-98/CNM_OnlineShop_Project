const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const CustomFunction = require('../Config/CustomFunction');
const ids = require('short-id');
module.exports = {
    LayTatCaSanPham: function (req, res, next) {
        var n = parseInt(req.params.pagenumber);
        var param = {
            TableName: "SanPham",
            ProjectionExpression: "#yr, TenSanPham, Anh, TrangThaiBan, TrangThaiXoa",
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
                res.end();
            } else {
                console.log("Thành công!");
                var count = data.Count / global.SoItemMoiPageQL;
                res.json(
                    {
                        SanPham: data.Items,
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage: global.SoItemMoiPageQL
                    }
                );
            }
        });
    },
    LaySanPhamTheoID_Admin: function (req, res) {
        var idsp = req.params.id;
        var param = {
            TableName: "SanPham",
            ProjectionExpression: "#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa,  ThongTin, Gia, TiLeSale, Anh, NgayTao, TrangThaiBan",
            FilterExpression: "#yr = :n",
            ExpressionAttributeNames: {
                "#yr": "ID_SanPham",
            },
            ExpressionAttributeValues: {
                ":n": idsp
            }
        };

        docClient.scan(param, function (err, data) {
            if (err) {
                console.error(err);
                res.end();
            } else {
                var param = {
                    TableName: "Size",
                    ProjectionExpression: "#yr, TenSize, SoLuong, ID_Size",
                    FilterExpression: "#yr = :n",
                    ExpressionAttributeNames: {
                        "#yr": "ID_SanPham",
                    },
                    ExpressionAttributeValues: {
                        ":n": idsp
                    }
                };
                docClient.scan(param, function (err, dataSize) {
                    if (err) {
                        console.error(err);
                        res.end();
                    } else {
                        console.log("Thành công!");
                        res.json(
                            {
                                SanPham: data.Items,
                                listSize: dataSize.Items
                            }
                        );
                    }
                });
                /* console.log("Thành công!");
                 res.json(data);*/
            }
        });
    },
    LaySanPhamTheoSoTrang: function (req, res, next) {
        var soItemMoiPageQL = parseInt(global.SoItemMoiPageQL);
        var n = parseInt(req.params.pagenumber);
        var begin = (n - 1) * soItemMoiPageQL;
        var end = (n - 1) * soItemMoiPageQL + soItemMoiPageQL;
        var param = {
            TableName: "SanPham",
            ProjectionExpression: "#yr, TenSanPham, Anh, TrangThaiBan, TrangThaiXoa",
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
                res.end();
            } else {
                console.log("Thành công!");
                var soTrang;
                var count = data.Count / soItemMoiPageQL;
                res.json(
                    {
                        SanPham: data.Items.slice(begin, end),
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage: soItemMoiPageQL
                    }
                );
            }
        });
    },
    LaySanPhamTheoTen: function (req, res, next) {
        var tenSanPham = CustomFunction.BoDau(req.params.tensanpham.toString().toLowerCase());
        var param = {
            TableName: "SanPham",
            ProjectionExpression: "#yr, TenSanPham, Anh, TrangThaiBan, TrangThaiXoa",
            FilterExpression: "TrangThaiXoa =:n and contains(TenSanPham.TenKhongVietHoa, :m)",
            ExpressionAttributeNames: {
                "#yr": "ID_SanPham",
            },
            ExpressionAttributeValues: {
                ":n": false,
                ":m": tenSanPham
            }
        };
        docClient.scan(param, function (err, data) {
            if (err) {
                console.error(err);
                res.end();
            } else {
                console.log("Thành công!");
                res.json(data);
            }
        });

    },
    ThemSanPham: function (req, res, next) {
        var tenSP = req.params.tensanpham;
        var idSP = ids.generate();
        var datetime = new Date();
        var paramSP = {
            TableName: "SanPham",
            Item: {
                "ID_SanPham": idSP,
                "TenSanPham": {
                    "Ten": tenSP,
                    "TenKhongVietHoa": CustomFunction.BoDau(tenSP.toLowerCase())
                },
                "ID_DanhMuc": null,
                "ID_ThuongHieu": null,
                "MoTa": {
                    "TongQuan": null,
                    "ChiTiet": null
                },
                "ThongTin": {
                    "NoiSanXuat": null,
                    "CheDoBaoHanh": null,
                    "PhuKienTheoKem": null
                },
                "Gia": null,
                "TiLeSale": null,
                "Anh": {
                    "AnhTemp": "https://bb4298.s3-us-west-1.amazonaws.com/index.svg",
                    "Avatar": null,
                    "AvtDetail1": null,
                    "AvtDetail2": null
                },
                "NgayTao": {
                    "Ngay": parseInt(datetime.getDate()),
                    "Thang": parseInt(datetime.getMonth()) + 1,
                    "Nam": parseInt(datetime.getFullYear())
                },
                "TrangThaiBan": false,
                "TrangThaiXoa": false
            }
        };

        docClient.put(paramSP, function (err, data) {
            if (err) {
                console.error(err);
                return res.json({
                    status: "fail",
                    message: "Lỗi hệ thống !"
                });

            } else {
                console.log("Thành công!");
                return res.json({
                    status: "ok",
                    message: "Tạo sản phẩm thành công !",
                    idSP: idSP,
                    tenSP: tenSP
                });
            }
        });
    },
    SuaSanPham: function (req, res, next) {
        var idSP = req.params.idsanpham;
        var ID_DanhMuc = req.body.ID_DanhMuc;
        var ID_ThuongHieu = req.body.ID_ThuongHieu;
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

        var param = {
            TableName: 'SanPham',
            Key: {
                "ID_SanPham": idSP
            },
            UpdateExpression: "set ID_DanhMuc = :a, ID_ThuongHieu = :b, Gia = :c, ThongTin.CheDoBaoHanh = :d, ThongTin.NoiSanXuat = :e, ThongTin.PhuKienTheoKem = :f, Anh.Avatar = :g, Anh.AvtDetail1 = :h, Anh.AvtDetail2= :i,TiLeSale = :k, MoTa.TongQuan = :l, MoTa.ChiTiet = :m, Anh.AnhTemp = :o",
            ExpressionAttributeValues: {
                ":a": ID_DanhMuc,
                ":b": ID_ThuongHieu,
                ":c": Gia,
                ":d": CheDoBaoHanh,
                ":e": NoiSanXuat,
                ":f": PhuKienTheoKem,
                ":g": Anh1,
                ":h": Anh2,
                ":i": Anh3,
                ":k": TiLeSale,
                ":l": TongQuan,
                ":m": ChiTiet,
                ":o": Anh1
            },
            ReturnValues: "UPDATED_NEW"
        };


        docClient.update(param, function (err, data) {
            if (err) {
                console.error(err);
                res.json({
                    status: "fail",
                    message: "Sửa sản phẩm thất bại !",
                    idSP: idSP
                });
            } else {
                console.log("Thành công!");
                res.json({
                    status: "ok",
                    message: "Sửa sản phẩm thành công !",
                    idSP: idSP,
                });
            }
        });
    },
    MoBanSanPham: function (req, res, next) {
        var idSP = req.body.idsanpham;
        var param = {
            TableName: "Size",
            ProjectionExpression: "#yr, TenSize,  SoLuong",
            FilterExpression: "ID_SanPham = :n",
            ExpressionAttributeNames: {
                "#yr": "ID_Size",
            },
            ExpressionAttributeValues: {
                ":n": idSP
            }
        };
        docClient.scan(param, function (err, data) {
            if (err) {
                console.error(err);
                res.end();
            } else {
             /*   res.json(data);*/
                if(data.Count <1 ){
                    res.json({
                        status: "fail",
                        message: "Vui lòng thêm size và số lượng trước khi mở bán !",
                        idSP: idSP
                    });
                    return;
                }else {
                    var param = {
                        TableName: 'SanPham',
                        Key: {
                            "ID_SanPham": idSP
                        },
                        UpdateExpression: "set TrangThaiBan = :a",
                        ExpressionAttributeValues: {
                            ":a": true,

                        },
                        ReturnValues: "UPDATED_NEW"
                    };
                    docClient.update(param, function (err, data) {
                        if (err) {
                            console.error(err);
                            res.json({
                                status: "fail",
                                message: "Mở bán sản phẩm thất bại !",
                                idSP: idSP
                            });
                        } else {
                            console.log("Thành công!");
                            res.json({
                                status: "ok",
                                message: "Mở bán phẩm thành công !",
                                idSP: idSP,
                            });
                        }
                    });
                }

            }
        });


    },
    HuyBanSanPham: function (req, res, next) {
        var idSP = req.body.idsanpham;
        var param = {
            TableName: 'SanPham',
            Key: {
                "ID_SanPham": idSP
            },
            UpdateExpression: "set TrangThaiBan = :a",
            ExpressionAttributeValues: {
                ":a": false,

            },
            ReturnValues: "UPDATED_NEW"
        };
        docClient.update(param, function (err, data) {
            if (err) {
                console.error(err);
                res.json({
                    status: "fail",
                    message: "Khóa sản phẩm thất bại !",
                    idSP: idSP
                });
            } else {
                console.log("Thành công!");
                res.json({
                    status: "ok",
                    message: "Khóa phẩm thành công !",
                    idSP: idSP,
                });
            }
        });
    },
    XoaSanPham: function (req, res, next) {
        var idSP = req.params.idsanpham;
        var param = {
            TableName: 'SanPham',
            Key: {
                "ID_SanPham": idSP
            },
            UpdateExpression: "set TrangThaiXoa = :n",
            ExpressionAttributeValues: {
                ":n": true
            },
            ReturnValues: "UPDATED_NEW"
        };


        docClient.update(param, function (err, data) {
            if (err) {
                console.error(err);
                res.json({
                    status: "fail",
                    message: "Xóa sản phẩm thất bại !",
                    idSP: idSP
                });
            } else {
                console.log("Thành công!");
                res.json({
                    status: "ok",
                    message: "Xóa sản phẩm thành công !",
                    idSP: idSP
                });
            }
        });
    },
    LaySizeTheoIdSP: function (req, res) {
        var idsp = req.query.idsanpham;
        var tongSoSP = 0;
        var param = {
            TableName: "Size",
            ProjectionExpression: "#yr, TenSize, SoLuong",
            FilterExpression: "ID_SanPham = :n",
            ExpressionAttributeNames: {
                "#yr": "ID_Size",
            },
            ExpressionAttributeValues: {
                ":n": idsp
            }
        };

        docClient.scan(param, function (err, data) {
            if (err) {
                console.error(err);
                res.end();
            } else {
                data.Items.forEach(function (item) {
                    tongSoSP += parseInt(item.SoLuong);
                });
                 console.log("Thành công!");
                 res.json({
                     Items:data.Items,
                     TongSL:tongSoSP
                 });
            }
        });
    },
    ThemSize: function (req, res, next) {
        var idSize = ids.generate();
        var idSP = req.body.idsp;
        var tenSize = req.body.tensize;
        var soLuong = req.body.soluong;
        var paramSP = {
            TableName: "Size",
            Item: {
                "ID_Size": idSize,
                "ID_SanPham": idSP,
                "TenSize": tenSize,
                "SoLuong": soLuong,

            }
        };

        docClient.put(paramSP, function (err, data) {
            if (err) {
                console.error(err);
                return res.json({
                    status: "fail",
                    message: "Lỗi hệ thống !"
                });

            } else {
                console.log("Thành công!");
                return res.json({
                    status: "ok",
                    message: "Thêm size thành công !",
                    idSize:idSize,
                    tenSize:tenSize,
                    soLuong:soLuong
                });
            }
        });
    },
    SuaSize: function (req, res, next) {
        var idSize = req.body.idsize;
        var soLuong = req.body.soluong;
        var param = {
            TableName: 'Size',
            Key: {
                "ID_Size": idSize
            },
            UpdateExpression: "set SoLuong = :a",
            ExpressionAttributeValues: {
                ":a": soLuong,

            },
            ReturnValues: "UPDATED_NEW"
        };
        docClient.update(param, function (err, data) {
            if (err) {
                console.error(err);
                res.json({
                    status: "fail",
                    message: "Thay đổi thất bại !",
                });
            } else {
                console.log("Thành công!");
                res.json({
                    status: "ok",
                    message: "Thay đổi thành công !",
                });
            }
        });
    },
    XoaSize: function (req, res, next) {
        var idSize = req.body.idsize;
        var param = {
            TableName: 'Size',
            Key: {
                "ID_Size": idSize
            }
        };


        docClient.delete(param, function (err, data) {
            if (err) {
                console.error(err);
                res.json({
                    status: "fail",
                    message: "Xóa sản phẩm thất bại !",
                });
            } else {
                console.log("Thành công!");
                res.json({
                    status: "ok",
                    message: "Xóa sản phẩm thành công !",
                });
            }
        });
    },
}