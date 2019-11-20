var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var CustomFunction = require('../Config/CustomFunction');
var ids = require('short-id');
module.exports = {
    LayTatCaThuongHieu: function (req, res, next) {
        var param = {
            TableName: "ThuongHieu",
            ProjectionExpression:"#yr, TenThuongHieu, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_ThuongHieu",
            },
            ExpressionAttributeValues:{
                ":n":false
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                /* res.end(JSON.stringify(data.Items.slice(0,2)));*/
                res.json(data);
            }
        });
    },
    ThemThuongHieu: function (req, res, next) {

        var tenTH = req.params.tenthuonghieu;
        var idTH = ids.generate();
        var paramDM = {
            TableName: "ThuongHieu",
            Item: {
                "ID_ThuongHieu": idTH,
                "TenThuongHieu": {
                    "Ten":tenTH,
                    "TenKhongVietHoa": CustomFunction.BoDau(tenTH.toLowerCase())
                },
                "TrangThaiXoa": false
            }
        };

        docClient.put(paramDM,function (err,data) {
            if (err) {
                console.error(err);
                return res.json({
                    status:"fail",
                    message:"Lỗi hệ thống !"
                });

            }
            else{
                console.log("Thành công!");
                return res.json({
                    status:"ok",
                    message:"Tạo thương hiệu thành công !",
                    idTH:idTH
                });
            }
        });
    },
    SuaThuongHieu: function (req, res, next) {
        var idTH = req.params.idthuonghieu;
        var tenTH = req.params.tenthuonghieu;
        var tenKhongVietHoa = CustomFunction.BoDau(tenTH.toLowerCase());
        var param = {
            TableName:'ThuongHieu',
            Key:{
                "ID_ThuongHieu": idTH
            },
            UpdateExpression: "set TenThuongHieu.Ten = :n, TenThuongHieu.TenKhongVietHoa = :m",
            ExpressionAttributeValues:{
                ":n": tenTH,
                ":m": tenKhongVietHoa
            },
            ReturnValues:"UPDATED_NEW"
        };


        docClient.update(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Sửa thương hiệu thất bại !",
                    idTH:idTH
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Sửa danh mục thành công !",
                    idTH:idTH,
                    tenth:tenTH
                });
            }
        });
    },
    XoaThuongHieu: function (req, res, next) {
        var idTH = req.params.idthuonghieu;
        var param = {
            TableName:'ThuongHieu',
            Key:{
                "ID_ThuongHieu": idTH
            },
            UpdateExpression: "set TrangThaiXoa = :n",
            ExpressionAttributeValues:{
                ":n": true
            },
            ReturnValues:"UPDATED_NEW"
        };


        docClient.update(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Xóa thương hiệu thất bại !",
                    idTH:idTH
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Xóa danh mục thành công !",
                    idTH:idTH
                });
            }
        });
    }
}