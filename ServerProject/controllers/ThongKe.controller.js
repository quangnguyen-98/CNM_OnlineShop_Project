const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const CustomFunction = require('../Config/CustomFunction');

module.exports = {
    LayHoaDonTheoSoTrang: function (req, res, next) {
        var soItemMoiPageQL = parseInt(global.SoItemMoiPageQL);
        var n = parseInt(req.params.pagenumber);
        var begin = (n - 1) * soItemMoiPageQL;
        var end = (n - 1) * soItemMoiPageQL + soItemMoiPageQL;

        var thang =parseInt(req.params.thang);
        var nam = parseInt(req.params.nam);

        var param = {
            TableName: "HoaDon",
            ProjectionExpression: "#yr, TenHoaDon,NgayTao,ThongTinKhachHang,ChiTietHoaDon, TongSoTien, TrangThai",
            FilterExpression: "TrangThai =:n and NgayTao.Thang =:m and NgayTao.Nam = :k",
            ExpressionAttributeNames: {
                "#yr": "ID_HoaDon",
            },
            ExpressionAttributeValues: {
                ":n": "ht",
                ":m":thang,
                ":k":nam
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
                var tongDoanhThu = 0;
                sortData.forEach(function (item) {
                    var tongTien = 0;
                    tongDoanhThu = tongDoanhThu+ item.TongSoTien;
                });

                var count = data.Count / soItemMoiPageQL;
                res.json(
                    {
                        status:"ok",
                        HoaDon: sortData.slice(begin, end),
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage: soItemMoiPageQL,
                        TongDoanhThu:tongDoanhThu
                    }
                );
            }
        });
    }

}