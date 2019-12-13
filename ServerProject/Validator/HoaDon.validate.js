var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
module.exports = {
    ValidateHoaDon: function (req, res, next) {
        var tenKH = req.body.tenkh;
        var SDT = req.body.sdt;
        var diaChi = req.body.diachi;
        var ghiChu = req.body.ghichu;

        if (tenKH.length == 0 || SDT.length == 0 || diaChi.length == 0 || ghiChu.length == 0) {
            res.json({
                status: "fail",
                message: "Vui lòng nhập đầy đủ thông tin đơn hàng !"
            });
            return;

        } else if (/^[0-9]*$/.test(SDT) == false) {
            res.json({
                status: "fail",
                message: "Số điện thoại phải là số !"
            });
            return;
        }else {
            next();
        }
    },
    Validate_Ngay_Nam_ThongKe: function (req, res, next) {
        var thang =req.params.thang;
        var nam = req.params.nam;

        if (thang.length == 0 || nam.length == 0 ) {
            res.json({
                status: "fail",
                message: "Vui lòng nhập đầy đủ tháng và năm !"
            });
            return;

        } else if (/^[0-9]*$/.test(thang) == false || /^[0-9]*$/.test(nam) == false) {
            res.json({
                status: "fail",
                message: "Tháng và năm phải là số !"
            });
            return;
        }else {
            next();
        }
    },
};

