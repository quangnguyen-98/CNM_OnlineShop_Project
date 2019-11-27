var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var fs = require('fs');
const path = require("path");
module.exports = {
    LayTatCaSanPham: function (req, res) {
        var param = {
            TableName: "SanPham",
            ProjectionExpression: "#yr, TenSanPham, ID_DanhMMuc, ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
            FilterExpression: "TrangThaiBan =:t and TrangThaiXoa = :k",
            ExpressionAttributeNames: {
                "#yr": "ID_SanPham",
            },
            ExpressionAttributeValues: {
                ":t": true,
                ":k": false
            }
        };

        docClient.scan(param, function (err, data) {
            if (err) {
                console.error(err);
                res.end();
            } else {
                console.log("Thành công!");
                /* res.end(JSON.stringify(data.Items.slice(0,2)));*/
                res.json(data);
            }
        });
    },
    LaySanPhamTheoID_Index: function (req, res) {
        var idsp = req.params.id;
        var param = {
            TableName: "SanPham",
            ProjectionExpression: "#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa,  ThongTin, Gia, TiLeSale, Anh, NgayTao, TrangThaiBan",
            FilterExpression: "#yr = :n and TrangThaiBan = :m",
            ExpressionAttributeNames: {
                "#yr": "ID_SanPham",
            },
            ExpressionAttributeValues: {
                ":n": idsp,
                ":m":true
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
                docClient.scan(param,function (err,dataSize) {
                    if (err) {
                        console.error(err);
                        res.end();
                    }
                    else{
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
    LaySanPhamTheoTen: function (req, res) {
        var tensp = req.params.ten;
        var n = parseInt(req.params.pagenumber);
        var soItemMoiPage = parseInt(fs.readFileSync(path.resolve(__dirname, "../Config/SoItemMoiPage.txt")));
        var begin = (n - 1) * soItemMoiPage;
        var end = (n - 1) * soItemMoiPage + soItemMoiPage;
        var param = {
            TableName: "SanPham",
            ProjectionExpression: "#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
            FilterExpression: "contains(TenSanPham.TenKhongVietHoa, :n) and (TrangThaiBan =:t and TrangThaiXoa = :k)",
            ExpressionAttributeNames: {
                "#yr": "ID_SanPham",
            },
            ExpressionAttributeValues: {
                ":n": tensp,
                ":t": true,
                ":k": false
            }
        };

        docClient.scan(param, function (err, data) {
            if (err) {
                console.error(err);
                res.end();
            } else {
                /*console.log("Thành công!");
                res.json(data);*/
                console.log("Thành công!");
                var count = data.Count / soItemMoiPage;
                res.json(
                    {
                        SanPham: data.Items.slice(begin, end),
                        SoTrang: Math.ceil(count)
                    }
                );
            }
        });
    },
    LaySanPhamTheoKhoangGia: function (req, res) {
        var tu = parseInt(req.params.tu);
        var den = parseInt(req.params.den);
        var n = parseInt(req.params.pagenumber);
        var soItemMoiPage = parseInt(fs.readFileSync(path.resolve(__dirname, "../Config/SoItemMoiPage.txt")));
        var begin = (n - 1) * soItemMoiPage;
        var end = (n - 1) * soItemMoiPage + soItemMoiPage;
        var param = {
            TableName: "SanPham",
            ProjectionExpression: "#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThaiBan",
            FilterExpression: "(Gia between :n and :m) and (TrangThaiBan =:t and TrangThaiXoa = :k)",
            ExpressionAttributeNames: {
                "#yr": "ID_SanPham",
            },
            ExpressionAttributeValues: {
                ":n": tu,
                ":m": den,
                ":t": true,
                ":k": false
            }
        };

        docClient.scan(param, function (err, data) {
            if (err) {
                console.error(err);
                res.end();
            } else {
                /*  console.log("Thành công!");
                  res.json(data);*/
                console.log("Thành công!");
                var count = data.Count / soItemMoiPage;
                res.json(
                    {
                        SanPham: data.Items.slice(begin, end),
                        SoTrang: Math.ceil(count)
                    }
                );
            }
        });
    },
    LaySanPhamTheoSoTrang: function (req, res) {
        if (req.params.sorttype == '*' || req.params.sortkey == '*') {
            var n = parseInt(req.params.pagenumber);
            var soItemMoiPage = parseInt(fs.readFileSync(path.resolve(__dirname, "../Config/SoItemMoiPage.txt")));
            var begin = (n - 1) * soItemMoiPage;
            var end = (n - 1) * soItemMoiPage + soItemMoiPage;
            var param = {
                TableName: "SanPham",
                ProjectionExpression: "#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThaiBan",
                FilterExpression: "TrangThaiXoa = :n and TrangThaiBan =:m",
                ExpressionAttributeNames: {
                    "#yr": "ID_SanPham",
                },
                ExpressionAttributeValues: {
                    ":n": false,
                    ":m": true
                }
            };
            docClient.scan(param, function (err, data) {
                if (err) {
                    console.error(err);
                    res.end();
                } else {
                    console.log("Thành công!");
                    var soTrang;
                    var count = data.Count / soItemMoiPage;
                    res.json(
                        {
                            SanPham: data.Items.slice(begin, end),
                            SoTrang: Math.ceil(count)
                        }
                    );
                }
            });
        } else {
            var sorttype = req.params.sorttype;
            if (sorttype == 'dm') {
                var sortkey = req.params.sortkey;
                var n = parseInt(req.params.pagenumber);
                var soItemMoiPage = parseInt(fs.readFileSync(path.resolve(__dirname, "../Config/SoItemMoiPage.txt")));
                var begin = (n - 1) * soItemMoiPage;
                var end = (n - 1) * soItemMoiPage + soItemMoiPage;
                var param = {
                    TableName: "SanPham",
                    ProjectionExpression: "#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
                    FilterExpression: "ID_DanhMuc = :n",
                    ExpressionAttributeNames: {
                        "#yr": "ID_SanPham",
                    },
                    ExpressionAttributeValues: {
                        ":n": sortkey,
                    }
                };
                docClient.scan(param, function (err, data) {
                    if (err) {
                        console.error(err);
                        res.end();
                    } else {
                        console.log("Thành công!");
                        var count = data.Count / soItemMoiPage;
                        res.json(
                            {
                                SanPham: data.Items.slice(begin, end),
                                SoTrang: Math.ceil(count)
                            }
                        );
                    }
                });
            }
            if (sorttype == 'th') {
                var sortkey = req.params.sortkey;
                var n = parseInt(req.params.pagenumber);
                var soItemMoiPage = parseInt(fs.readFileSync(path.resolve(__dirname, "../Config/SoItemMoiPage.txt")));
                var begin = (n - 1) * soItemMoiPage;
                var end = (n - 1) * soItemMoiPage + soItemMoiPage;
                var param = {
                    TableName: "SanPham",

                    ProjectionExpression: "#yr, TenSanPham, ID_DanhMuc,ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
                    FilterExpression: "ID_ThuongHieu = :n",
                    ExpressionAttributeNames: {
                        "#yr": "ID_SanPham",
                    },
                    ExpressionAttributeValues: {
                        ":n": sortkey,
                    }
                };
                docClient.scan(param, function (err, data) {
                    if (err) {
                        console.error(err);
                        res.end();
                    } else {
                        console.log("Thành công!");
                        var count = data.Count / soItemMoiPage;
                        res.json(
                            {
                                SanPham: data.Items.slice(begin, end),
                                SoTrang: Math.ceil(count)
                            }
                        );
                    }
                });
            }
        }
    }
};