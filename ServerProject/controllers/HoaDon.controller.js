const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const CustomFunction = require('../Config/CustomFunction');
const ids = require('short-id');
module.exports = {
    LayTatCaHoaDon: function (req, res, next) {
        var n = parseInt(req.params.pagenumber);
        var param = {
            TableName: "HoaDon",
            ProjectionExpression: "#yr, TenHoaDon, TrangThaiXoa",
            FilterExpression: "TrangThaiXoa =:n",
            ExpressionAttributeNames: {
                "#yr": "ID_HoaDon",
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
                var count = data.Count / global.SoItemMoiPageQL;
                res.json(
                    {
                        HoaDon: data.Items,
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage: global.SoItemMoiPageQL
                    }
                );
            }
        });
    },
    LayHoaDonTheoSoTrang: function (req, res, next) {
        var soItemMoiPageQL = parseInt(global.SoItemMoiPageQL);
        var n = parseInt(req.params.pagenumber);
        var begin = (n - 1) * soItemMoiPageQL;
        var end = (n - 1) * soItemMoiPageQL + soItemMoiPageQL;
        var param = {
            TableName: "HoaDon",
            ProjectionExpression: "#yr, TenHoaDon, TrangThaiXoa",
            FilterExpression: "TrangThaiXoa =:n",
            ExpressionAttributeNames: {
                "#yr": "ID_HoaDon",
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
                        HoaDon: data.Items.slice(begin, end),
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage: soItemMoiPageQL
                    }
                );
            }
        });
    },
    LayHoaDonTheoTen: function (req, res, next) {
        var tenHoaDon = CustomFunction.BoDau(req.params.tenhoadon.toString().toLowerCase());
        var param = {
            TableName: "HoaDon",
            ProjectionExpression: "#yr, TenHoaDon, TrangThaiXoa",
            FilterExpression: "TrangThaiXoa =:n and contains(TenHoaDon.TenKhongVietHoa, :m)",
            ExpressionAttributeNames: {
                "#yr": "ID_HoaDon",
            },
            ExpressionAttributeValues: {
                ":n": false,
                ":m": tenHoaDon
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
    ThemHoaDon: function (req, res, next) {
        var gioHang = [];
        gioHang = JSON.parse(req.body.giohang);
        var MGG = req.body.mgg;
        var tenKH = req.body.tenkh;
        var SDT = req.body.sdt;
        var diaChi = req.body.diachi;
        var ghiChu = req.body.ghichu;
        var tiLeSale = 0;

        // res.json({
        //     status:"ok",
        //     message:{
        //         a:MGG,
        //         b:tenKH,
        //         c:SDT,
        //         d:diaChi,
        //         e:ghiChu,
        //         f:JSON.stringify(gioHang)
        //     }
        // });

        gioHang.forEach(function (item, index) {
            var param = {
                TableName: "SanPham",
                ProjectionExpression: "#yr, Gia,TiLeSale",
                FilterExpression: "#yr = :n",
                ExpressionAttributeNames: {
                    "#yr": "ID_SanPham",
                },
                ExpressionAttributeValues: {
                    ":n": item.ID_SanPham
                }
            };
            docClient.scan(param, function (err, data) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    var donGia = parseInt(data.Items[0].Gia);
                    var tiLeSale = parseInt(data.Items[0].TiLeSale);
                    var giaBan = donGia - (donGia / 100 * tiLeSale);
                    var tongGia = giaBan * item.SoLuong;
                    // global.TongGiaSP = global.TongGiaSP + tongGia;
                    gioHang[index] = {
                        ID_SanPham: item.ID_SanPham,
                        TenSanPham: item.TenSanPham,
                        Anh: item.Anh,
                        ID_Size: item.ID_Size,
                        TenSize: item.TenSize,
                        SoLuong: item.SoLuong,
                        Gia: giaBan,
                        TongGia: tongGia
                    };
                }
            });

        });


        if (MGG != "none") {
            var param1 = {
                TableName: "MaGiamGia",
                ProjectionExpression: "#yr, TiLeSale, SoLuong",
                FilterExpression: "TenMaGiamGia =:n",
                ExpressionAttributeNames: {
                    "#yr": "ID_MaGiamGia",
                },
                ExpressionAttributeValues: {
                    ":n": MGG
                }
            };
            docClient.scan(param1, function (err, data) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    var idMGG = data.Items[0].ID_MaGiamGia;
                    var soLuongMGG =parseInt(data.Items[0].SoLuong) -1;

                    //trừ số lượng mã giảm giá
                    var param2 = {
                        TableName: 'MaGiamGia',
                        Key: {
                            "ID_MaGiamGia": idMGG
                        },
                        UpdateExpression: "set SoLuong = :n",
                        ExpressionAttributeValues: {
                            ":n": soLuongMGG
                        },
                        ReturnValues: "UPDATED_NEW"
                    };

                    docClient.update(param2, function (err, data) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("Thành công!");
                        }
                    });
                }
            });
        }
        // var giaCuoiCung = TongGiaSP - (TongGiaSP / 100 * tiLeSale);
        var idHD = ids.generate();
        var datetime = new Date();
        var paramHD = {
            TableName: "HoaDon",
            Item: {
                "ID_HoaDon": idHD,
                "NgayTao": {
                    "Nam": parseInt(datetime.getFullYear()),
                    "Ngay": parseInt(datetime.getDate()),
                    "Thang": parseInt(datetime.getMonth()) + 1
                },
                "ThongTinKhachHang": {
                    "Ten": tenKH,
                    "SoDienThoai": SDT,
                    "DiaChi": diaChi,
                    "GhiChu": ghiChu
                },
                "ChiTietHoaDon": gioHang,
                "MaGiamGia": MGG,
                "TrangThaiXacNhan": false
            }
        };

        docClient.put(paramHD, function (err, data) {
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
                    message: "Tạo hóa đơn thành công !",
                    idHD: idHD
                });
            }
        });
    },
    SuaHoaDon: function (req, res, next) {
        var idHD = req.params.idhoadon;
        var tenHD = req.params.tenhoadon;
        var tenKhongVietHoa = CustomFunction.BoDau(tenHD.toLowerCase());
        var param = {
            TableName: 'HoaDon',
            Key: {
                "ID_HoaDon": idHD
            },
            UpdateExpression: "set TenHoaDon.Ten = :n, TenHoaDon.TenKhongVietHoa = :m",
            ExpressionAttributeValues: {
                ":n": tenHD,
                ":m": tenKhongVietHoa
            },
            ReturnValues: "UPDATED_NEW"
        };

        docClient.update(param, function (err, data) {
            if (err) {
                console.error(err);
                res.json({
                    status: "fail",
                    message: "Sửa hóa đơn thất bại !",
                    idHD: idHD
                });
            } else {
                console.log("Thành công!");
                res.json({
                    status: "ok",
                    message: "Sửa hóa đơn thành công !",
                    idHD: idHD,
                    tenHD: tenHD
                });
            }
        });
    },
    XoaHoaDon: function (req, res, next) {
        var idHD = req.params.idhoadon;
        var param = {
            TableName: 'HoaDon',
            Key: {
                "ID_HoaDon": idHD
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
                    message: "Xóa hóa đơn thất bại !",
                    idHD: idHD
                });
            } else {
                console.log("Thành công!");
                res.json({
                    status: "ok",
                    message: "Xóa hóa đơn thành công !",
                    idHD: idHD
                });
            }
        });
    }
}