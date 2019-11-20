var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var ids = require('short-id');
module.exports = {
    LayTatCaDanhMuc: function (req, res, next) {
        var param = {
            TableName: "DanhMuc",
            ProjectionExpression:"#yr, TenDanhMuc, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_DanhMuc",
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
    ThemDanhMuc: function (req, res, next) {
        listDM =[];
        var tenDM = req.params.tendanhmuc;
        var idDM = ids.generate();
        /*var param = {
            TableName: "DanhMuc",
            ProjectionExpression:"#yr, TenDanhMuc, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_DanhMuc",
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
                res.json(data);
               data.Items.forEach(function (item) {
                   listDM.push(item);
               });
            }
        });
        listDM.forEach(function () {
            if(item.TenDanhMuc == tenDM){
                res.json({
                    status:"fail",
                    message:"Tên danh mục này đã có trong hệ thống, vui lòng dùng tên khác"
                });
            }
        });*/
        var paramDM = {
            TableName: "DanhMuc",
            Item: {
                "ID_DanhMuc": idDM,
                "TenDanhMuc": {
                    "Ten":tenDM,
                    "TenKhongVietHoa": CustomFunction.BoDau(tenDM.toLowerCase())
                },
                "TrangThaiXoa": false
            }
        };

        docClient.put(paramDM,function (err,data) {
            if (err) {
                console.error(err);
                return res.json({
                    status:"fail",
                    message:"Lỗi hệ thống"
                });

            }
            else{
                console.log("Thành công!");
                return res.json({
                    status:"ok",
                    message:"Tạo danh mục thành công !",
                    idDM:idDM
                });
            }
        });
    },
    SuaDanhMuc: function (req, res, next) {
        var idDM = req.params.iddanhmuc;
        var tenDM = req.params.tendanhmuc;
        var tenKhongVietHoa = CustomFunction.BoDau(tenDM.toLowerCase());
        var param = {
            TableName:'DanhMuc',
            Key:{
                "ID_DanhMuc": idDM
            },
            UpdateExpression: "set TenDanhMuc.Ten = :n, TenDanhMuc.TenKhongVietHoa = :m",
            ExpressionAttributeValues:{
                ":n": tenDM,
                "m":tenKhongVietHoa
            },
            ReturnValues:"UPDATED_NEW"
        };


        docClient.update(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Sửa danh mục thất bại !",
                    idDM:idDM
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Sửa danh mục thành công !",
                    idDM:idDM,
                    tendm:tenDM
                });
            }
        });
    },
    XoaDanhMuc: function (req, res, next) {
        var idDM = req.params.iddanhmuc;
        var param = {
            TableName:'DanhMuc',
            Key:{
                "ID_DanhMuc": idDM
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
                    message:"Xóa danh mục thất bại !",
                    idDM:idDM
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Xóa danh mục thành công !",
                    idDM:idDM
                });
            }
        });
    }
}