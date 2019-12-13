const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const CustomFunction = require('../Config/CustomFunction');
const ids = require('short-id');
var TongGiaSP = 0;
var trangThai ;

module.exports = {
    LayTatCaHoaDon: function (req, res, next) {
        if (req.params.sorttype === "cho") {
            var param = {
                TableName: "HoaDon",
                ProjectionExpression: "#yr, ChiTietHoaDon, MaGiamGia, NgayTao, ThongTinKhachHang, TiLeSale, TongSoTien, TrangThai",
                FilterExpression: "TrangThai =:n",
                ExpressionAttributeNames: {
                    "#yr": "ID_HoaDon",
                },
                ExpressionAttributeValues: {
                    ":n": "cho"
                }
            };
            docClient.scan(param, function (err, data) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    console.log("Thành công!");
                    var sortData = [];
                    sortData = data.Items.sort(function (a, b) {
                        return new Date(b.NgayTao.Nam, b.NgayTao.Thang, b.NgayTao.Ngay) - new Date(a.NgayTao.Nam, a.NgayTao.Thang, a.NgayTao.Ngay);
                    });
                    var count = data.Count / global.SoItemMoiPageQL;
                    res.json(
                        {
                            HoaDon: sortData,
                            SoTrang: Math.ceil(count),
                            TongItem: data.Count,
                            ItemMoiPage: global.SoItemMoiPageQL
                        }
                    );
                }
            });
        } else if (req.params.sorttype === "ship") {
            var param = {
                TableName: "HoaDon",
                ProjectionExpression: "#yr, ChiTietHoaDon, MaGiamGia, NgayTao, ThongTinKhachHang, TiLeSale, TongSoTien, TrangThai",
                FilterExpression: "TrangThai =:n",
                ExpressionAttributeNames: {
                    "#yr": "ID_HoaDon",
                },
                ExpressionAttributeValues: {
                    ":n": "ship"
                }
            };
            docClient.scan(param, function (err, data) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    console.log("Thành công!");
                    var sortData = [];
                    sortData = data.Items.sort(function (a, b) {
                        return new Date(b.NgayTao.Nam, b.NgayTao.Thang, b.NgayTao.Ngay) - new Date(a.NgayTao.Nam, a.NgayTao.Thang, a.NgayTao.Ngay);
                    });
                    var count = data.Count / global.SoItemMoiPageQL;
                    res.json(
                        {
                            HoaDon: sortData,
                            SoTrang: Math.ceil(count),
                            TongItem: data.Count,
                            ItemMoiPage: global.SoItemMoiPageQL
                        }
                    );
                }
            });
        } else if (req.params.sorttype === "ht") {
            var param = {
                TableName: "HoaDon",
                ProjectionExpression: "#yr, ChiTietHoaDon, MaGiamGia, NgayTao, ThongTinKhachHang, TiLeSale, TongSoTien, TrangThai",
                FilterExpression: "TrangThai =:n",
                ExpressionAttributeNames: {
                    "#yr": "ID_HoaDon",
                },
                ExpressionAttributeValues: {
                    ":n": "ht"
                }
            };
            docClient.scan(param, function (err, data) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    console.log("Thành công!");
                    var sortData = [];
                    sortData = data.Items.sort(function (a, b) {
                        return new Date(b.NgayTao.Nam, b.NgayTao.Thang, b.NgayTao.Ngay) - new Date(a.NgayTao.Nam, a.NgayTao.Thang, a.NgayTao.Ngay);
                    });
                    var count = data.Count / global.SoItemMoiPageQL;
                    res.json(
                        {
                            HoaDon: sortData,
                            SoTrang: Math.ceil(count),
                            TongItem: data.Count,
                            ItemMoiPage: global.SoItemMoiPageQL
                        }
                    );
                }
            });
        } else if (req.params.sorttype === "huy") {
            var param = {
                TableName: "HoaDon",
                ProjectionExpression: "#yr, ChiTietHoaDon, MaGiamGia, NgayTao, ThongTinKhachHang, TiLeSale, TongSoTien, TrangThai",
                FilterExpression: "TrangThai =:n",
                ExpressionAttributeNames: {
                    "#yr": "ID_HoaDon",
                },
                ExpressionAttributeValues: {
                    ":n": "huy"
                }
            };
            docClient.scan(param, function (err, data) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    console.log("Thành công!");
                    var sortData = [];
                    sortData = data.Items.sort(function (a, b) {
                        return new Date(b.NgayTao.Nam, b.NgayTao.Thang, b.NgayTao.Ngay) - new Date(a.NgayTao.Nam, a.NgayTao.Thang, a.NgayTao.Ngay);
                    });
                    var count = data.Count / global.SoItemMoiPageQL;
                    res.json(
                        {
                            HoaDon: sortData,
                            SoTrang: Math.ceil(count),
                            TongItem: data.Count,
                            ItemMoiPage: global.SoItemMoiPageQL
                        }
                    );
                }
            });
        }

    },
    LayHoaDonTheoSoTrang: function (req, res, next) {
        var soItemMoiPageQL = parseInt(global.SoItemMoiPageQL);
        var n = parseInt(req.params.pagenumber);
        var begin = (n - 1) * soItemMoiPageQL;
        var end = (n - 1) * soItemMoiPageQL + soItemMoiPageQL;

        if (req.params.sorttype === "cho") {
            var param = {
                TableName: "HoaDon",
                ProjectionExpression: "#yr, TenHoaDon,NgayTao,ThongTinKhachHang, TongSoTien, TrangThai",
                FilterExpression: "TrangThai =:n",
                ExpressionAttributeNames: {
                    "#yr": "ID_HoaDon",
                },
                ExpressionAttributeValues: {
                    ":n": "cho"
                }
            };
            docClient.scan(param, function (err, data) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    console.log("Thành công!");
                    var sortData = [];
                    sortData = data.Items.sort(function (a, b) {
                        return new Date(b.NgayTao.Nam, b.NgayTao.Thang, b.NgayTao.Ngay) - new Date(a.NgayTao.Nam, a.NgayTao.Thang, a.NgayTao.Ngay);
                    });
                    var count = data.Count / soItemMoiPageQL;
                    res.json(
                        {
                            HoaDon: sortData.slice(begin, end),
                            SoTrang: Math.ceil(count),
                            TongItem: data.Count,
                            ItemMoiPage: soItemMoiPageQL
                        }
                    );
                }
            });
        } else if (req.params.sorttype === "ship") {
            var param = {
                TableName: "HoaDon",
                ProjectionExpression: "#yr, TenHoaDon,NgayTao,ThongTinKhachHang, TongSoTien, TrangThai",
                FilterExpression: "TrangThai =:n",
                ExpressionAttributeNames: {
                    "#yr": "ID_HoaDon",
                },
                ExpressionAttributeValues: {
                    ":n": "ship"
                }
            };
            docClient.scan(param, function (err, data) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    console.log("Thành công!");
                    var sortData = [];
                    sortData = data.Items.sort(function (a, b) {
                        return new Date(b.NgayTao.Nam, b.NgayTao.Thang, b.NgayTao.Ngay) - new Date(a.NgayTao.Nam, a.NgayTao.Thang, a.NgayTao.Ngay);
                    });
                    var count = data.Count / soItemMoiPageQL;
                    res.json(
                        {
                            HoaDon: sortData.slice(begin, end),
                            SoTrang: Math.ceil(count),
                            TongItem: data.Count,
                            ItemMoiPage: soItemMoiPageQL
                        }
                    );
                }
            });
        } else if (req.params.sorttype === "ht") {
            var param = {
                TableName: "HoaDon",
                ProjectionExpression: "#yr, TenHoaDon,NgayTao,ThongTinKhachHang, TongSoTien, TrangThai",
                FilterExpression: "TrangThai =:n",
                ExpressionAttributeNames: {
                    "#yr": "ID_HoaDon",
                },
                ExpressionAttributeValues: {
                    ":n": "ht"
                }
            };
            docClient.scan(param, function (err, data) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    console.log("Thành công!");
                    var sortData = [];
                    sortData = data.Items.sort(function (a, b) {
                        return new Date(b.NgayTao.Nam, b.NgayTao.Thang, b.NgayTao.Ngay) - new Date(a.NgayTao.Nam, a.NgayTao.Thang, a.NgayTao.Ngay);
                    });
                    var count = data.Count / soItemMoiPageQL;
                    res.json(
                        {
                            HoaDon: sortData.slice(begin, end),
                            SoTrang: Math.ceil(count),
                            TongItem: data.Count,
                            ItemMoiPage: soItemMoiPageQL
                        }
                    );
                }
            });
        } else if (req.params.sorttype === "huy") {
            var param = {
                TableName: "HoaDon",
                ProjectionExpression: "#yr, TenHoaDon,NgayTao,ThongTinKhachHang, TongSoTien, TrangThai",
                FilterExpression: "TrangThai =:n",
                ExpressionAttributeNames: {
                    "#yr": "ID_HoaDon",
                },
                ExpressionAttributeValues: {
                    ":n": "huy"
                }
            };
            docClient.scan(param, function (err, data) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    console.log("Thành công!");
                    var sortData = [];
                    sortData = data.Items.sort(function (a, b) {
                        return new Date(b.NgayTao.Nam, b.NgayTao.Thang, b.NgayTao.Ngay) - new Date(a.NgayTao.Nam, a.NgayTao.Thang, a.NgayTao.Ngay);
                    });
                    var count = data.Count / soItemMoiPageQL;
                    res.json(
                        {
                            HoaDon: sortData.slice(begin, end),
                            SoTrang: Math.ceil(count),
                            TongItem: data.Count,
                            ItemMoiPage: soItemMoiPageQL
                        }
                    );
                }
            });
        }
    },
    LayHoaDonTheoSearchKey: function (req, res, next) {
        var searchKey = req.params.searchkey;
        //Tìm hóa đơn trạng thái chờ
        if (req.params.sorttype === "cho") {
            if (req.params.searchtype === "ID") {
                var paramSearch = TimKiemTheoSearchKey("cho", "ID_HoaDon", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo id thành công !");
                        return res.json(data);
                    }
                });

            }
            if (req.params.searchtype === "TEN") {
                var paramSearch = TimKiemTheoSearchKey("cho", "ThongTinKhachHang.TenKhongVietHoa", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo tên thành công !");
                        return res.json(data);
                    }
                });
            }
            if (req.params.searchtype === "SDT") {
                var paramSearch = TimKiemTheoSearchKey("cho", "ThongTinKhachHang.SoDienThoai", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo sdt thành công !");
                        return res.json(data);
                    }
                });
            }
        }
        //Tìm hóa đơn trạng thái ship
        else if (req.params.sorttype === "ship") {
            if (req.params.searchtype === "ID") {
                var paramSearch = TimKiemTheoSearchKey("ship", "ID_HoaDon", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo id thành công !");
                        return res.json(data);
                    }
                });

            }
            if (req.params.searchtype === "TEN") {
                var paramSearch = TimKiemTheoSearchKey("ship", "ThongTinKhachHang.TenKhongVietHoa", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo tên thành công !");
                        return res.json(data);
                    }
                });
            }
            if (req.params.searchtype === "SDT") {
                var paramSearch = TimKiemTheoSearchKey("ship", "ThongTinKhachHang.SoDienThoai", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo sdt thành công !");
                        return res.json(data);
                    }
                });
            }
        }
        //Tìm hóa đơn trạng thái hoàn thành
        else if (req.params.sorttype === "ht") {
            if (req.params.searchtype === "ID") {
                var paramSearch = TimKiemTheoSearchKey("ht", "ID_HoaDon", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo id thành công !");
                        return res.json(data);
                    }
                });

            }
            if (req.params.searchtype === "TEN") {
                var paramSearch = TimKiemTheoSearchKey("ht", "ThongTinKhachHang.TenKhongVietHoa", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo tên thành công !");
                        return res.json(data);
                    }
                });
            }
            if (req.params.searchtype === "SDT") {
                var paramSearch = TimKiemTheoSearchKey("ht", "ThongTinKhachHang.SoDienThoai", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo sdt thành công !");
                        return res.json(data);
                    }
                });
            }
        }
        //Tìm hóa đơn trạng thái hủy
        else if (req.params.sorttype === "huy") {
            if (req.params.searchtype === "ID") {
                var paramSearch = TimKiemTheoSearchKey("huy", "ID_HoaDon", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo id thành công !");
                        return res.json(data);
                    }
                });

            }
            if (req.params.searchtype === "TEN") {
                var paramSearch = TimKiemTheoSearchKey("huy", "ThongTinKhachHang.TenKhongVietHoa", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo tên thành công !");
                        return res.json(data);
                    }
                });
            }
            if (req.params.searchtype === "SDT") {
                var paramSearch = TimKiemTheoSearchKey("huy", "ThongTinKhachHang.SoDienThoai", searchKey);
                docClient.scan(paramSearch, function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("tim theo sdt thành công !");
                        return res.json(data);
                    }
                });
            }
        }

    },
    ThemHoaDon: function (req, res, next) {

        var gioHang = [];
        gioHang = JSON.parse(req.body.giohang);
        var MGG = req.body.mgg;
        var tenKH = req.body.tenkh;
        var SDT = req.body.sdt;
        var diaChi = req.body.diachi;
        var ghiChu = req.body.ghichu;

        var idHD = ids.generate();
        /*   giaCuoiCung = 0;*/

        if (MGG.toString().localeCompare("none") == 0) {
            gioHang = DuyetSanPham(gioHang);
            var MGG1 = null;
            var tiLeSale1 = null;
            var abc = 0;
            gioHang.forEach(function (item) {
                var gia = item.TongGia;
                abc += gia;
            });
            ThemHoaDonVaoDB_KOMGG(idHD, tenKH, SDT, diaChi, ghiChu, gioHang, MGG1, tiLeSale1, abc);

            res.json({
                status: "ok",
                message: "Tạo hóa đơn thành công  !",
                idHD: idHD
            });
            return;
        }

        if (MGG != "none") {
            gioHang = DuyetSanPham(gioHang);
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
                    var soLuongMGG = parseInt(data.Items[0].SoLuong) - 1;
                    var tiLeSale = parseInt(data.Items[0].TiLeSale);


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
                            var tongGiaChuaSale = 0;
                            gioHang.forEach(function (item) {
                                tongGiaChuaSale = tongGiaChuaSale + item.TongGia;
                            });

                            var giaCuoiCung = parseInt(tongGiaChuaSale - ((tongGiaChuaSale / 100) * tiLeSale));
                            ThemHoaDonVaoDB(idHD, tenKH, SDT, diaChi, ghiChu, gioHang, MGG, tiLeSale, giaCuoiCung);

                            res.json({
                                status: "ok",
                                message: "Tạo hóa đơn thành công !",
                                idHD: idHD
                            });
                            return;
                        }
                    });
                }
            });
        }


    },
    ChuyenTrangThaiHoaDon: function (req, res, next) {
        var idHD = req.params.idhoadon;
        var trangThaiChuyen = req.params.trangthai;

        var paramHoaDon = ParamChuyenTrangThaiHoaDon(idHD, trangThaiChuyen);
        docClient.update(paramHoaDon, function (err, data) {
            if (err) {
                console.error(err);
                res.json({
                    status: "fail",
                    message: "Chuyển trang thái hóa đơn thất bại !",
                    idHD: idHD
                });
            } else {
                console.log("Thành công!");
                res.json({
                    status: "ok",
                    message: "Thành công !",
                    idHD: idHD
                });
            }
        });
    },
    ChuyenTrangThaiHoaDon_HoanThanh: function (req, res, next) {
        var idHD = req.params.idhoadon;
        var trangThaiChuyen = "ht";
        //Lấy danh sách hóa đơn
        var param = {
            TableName: "HoaDon",
            ProjectionExpression: "#yr,ChiTietHoaDon",
            FilterExpression: "#yr = :n",
            ExpressionAttributeNames: {
                "#yr": "ID_HoaDon",
            },
            ExpressionAttributeValues: {
                ":n": idHD
            }
        };
        docClient.scan(param, function (err, data) {
            if(err){
                console.log(err);
            }else {
                var gioHang = [];
                gioHang = data.Items[0].ChiTietHoaDon;
                // GiamSoLuongSizeSauKhiThemHoaDon(gioHang);
                var param1 = {
                    TableName: "Size"
                };
                docClient.scan(param1, function (err, data) {
                    if (err) {
                        console.error(err);
                        res.end();
                    } else {
                        var listSP = [];
                        var trangThai = true;
                        data.Items.forEach(function (item) {
                            gioHang.forEach(function (item2) {
                                if (item.ID_Size == item2.ID_Size) {
                                    //trừ số lượng size
                                    if (parseInt(item.SoLuong) - parseInt(item2.SoLuong) < 0) {
                                        res.json({
                                            status: "fail",
                                            message: "Một số sản phẩm không đủ số lượng trong kho !",
                                            idHD: idHD
                                        });
                                        trangThai = false;
                                        return;
                                    } else if(parseInt(item.SoLuong) - parseInt(item2.SoLuong) >= 0){
                                        var soLuong = parseInt(item.SoLuong) - parseInt(item2.SoLuong);
                                       var itemSP= {ID_Size:item.ID_Size,SoLuong:soLuong};
                                       listSP.push(itemSP);

                                    }
                                }
                            });
                        });
                        if(trangThai == true){
                            listSP.forEach(function (item) {
                                var param2 = {
                                    TableName: 'Size',
                                    Key: {
                                        "ID_Size": item.ID_Size
                                    },
                                    UpdateExpression: "set SoLuong = :n",
                                    ExpressionAttributeValues: {
                                        ":n": item.SoLuong
                                    },
                                    ReturnValues: "UPDATED_NEW"
                                };
                                docClient.update(param2,function (err, data) {});
                            });
                            var paramHoaDon = ParamChuyenTrangThaiHoaDon(idHD, trangThaiChuyen);
                            docClient.update(paramHoaDon, function (err, data) {
                                if (err) {
                                    console.error(err);
                                    res.json({
                                        status: "fail",
                                        message: "Thất bại !",
                                        idHD: idHD
                                    });
                                    return;
                                } else {
                                    res.json({
                                        status: "ok",
                                        message: "Đơn hàng đã hoàn thành !",
                                        idHD: idHD
                                    });
                                    return;
                                }
                            });
                        }

                    }
                });
            }
        });
    }

}


//Hàm viết riêng
function DuyetSanPham(gioHang = []) {
    TongGiaSP = 0;
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

                gioHang[index] = {
                    ID_SanPham: item.ID_SanPham,
                    TenSanPham: item.TenSanPham,
                    Anh: item.Anh,
                    ID_Size: item.ID_Size,
                    TenSize: item.TenSize,
                    SoLuong: parseInt(item.SoLuong),
                    Gia: parseInt(giaBan),
                    TongGia: parseInt(tongGia)
                };
                TongGiaSP += tongGia;

            }
        });
    });
    return gioHang;
}

function ThemHoaDonVaoDB(idHD, tenKH, SDT, diaChi, ghiChu, gioHang, MGG, tiLeSale, giaCuoiCung) {

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
                "TenKhongVietHoa": CustomFunction.BoDau(tenKH.toLowerCase()),
                "SoDienThoai": SDT,
                "DiaChi": diaChi,
                "GhiChu": ghiChu
            },
            "ChiTietHoaDon": gioHang,
            "MaGiamGia": MGG,
            "TiLeSale": tiLeSale,
            "TongSoTien": giaCuoiCung,
            "TrangThai": "cho"

        }
    };

    docClient.put(paramHD, function (err, data) {
    });
}

function ThemHoaDonVaoDB_KOMGG(idHD, tenKH, SDT, diaChi, ghiChu, gioHang, MGG, tiLeSale, giaCuoi) {

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
                "TenKhongVietHoa": CustomFunction.BoDau(tenKH.toLowerCase()),
                "SoDienThoai": SDT,
                "DiaChi": diaChi,
                "GhiChu": ghiChu
            },
            "ChiTietHoaDon": gioHang,
            "MaGiamGia": MGG,
            "TiLeSale": tiLeSale,
            "TongSoTien": giaCuoi,
            "TrangThai": "cho"

        }
    };

    docClient.put(paramHD, function (err, data) {
    });
}

function GiamSoLuongSizeSauKhiThemHoaDon(gioHang = []) {
    // var trangThai;
    var param1 = {
        TableName: "Size"
    };
    docClient.scan(param1, function (err, data) {
        if (err) {
            console.error(err);
            res.end();
        } else {
            data.Items.forEach(function (item) {
                gioHang.forEach(function (item2) {
                    if (item.ID_Size == item2.ID_Size) {
                        //trừ số lượng size
                        if (parseInt(item.SoLuong) - parseInt(item2.SoLuong) < 0) {
                            trangThai = false;
                        } else if(parseInt(item.SoLuong) - parseInt(item2.SoLuong) > 0){
                            var param2 = {
                                TableName: 'Size',
                                Key: {
                                    "ID_Size": item.ID_Size
                                },
                                UpdateExpression: "set SoLuong = :n",
                                ExpressionAttributeValues: {
                                    ":n": parseInt(item.SoLuong) - parseInt(item2.SoLuong)
                                },
                                ReturnValues: "UPDATED_NEW"
                            };
                            docClient.update(param2,function (err, data) {});
                            trangThai = true;
                        }
                    }
                });
            });
        }
    });

}

function TimKiemTheoSearchKey(sorttype, searchtype, searchkey) {
    // var objData = new Object();
    var a = new Object();
    searchkey = CustomFunction.BoDau(searchkey.toString().toLowerCase());
    var param = {
        TableName: "HoaDon",
        ProjectionExpression: "#yr, TenHoaDon,NgayTao,ThongTinKhachHang, TongSoTien, TrangThai",
        FilterExpression: "TrangThai =:n and contains(" + searchtype.toString() + ", :m)",
        ExpressionAttributeNames: {
            "#yr": "ID_HoaDon",
        },
        ExpressionAttributeValues: {
            ":n": sorttype.toString(),
            ":m": searchkey.toString()
        }
    };
    return param;
}

function ParamChuyenTrangThaiHoaDon(idHD, trangThai) {
    var param = {
        TableName: 'HoaDon',
        Key: {
            "ID_HoaDon": idHD
        },
        UpdateExpression: "set TrangThai = :m",
        ExpressionAttributeValues: {
            ":m": trangThai
        },
        ReturnValues: "UPDATED_NEW"
    };
    return param;
}