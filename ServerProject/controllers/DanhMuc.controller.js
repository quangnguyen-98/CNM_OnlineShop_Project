const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const CustomFunction = require('../Config/CustomFunction');
const ids = require('short-id');
module.exports = {
    LayTatCaDanhMuc: function (req, res, next) {
        var n = parseInt(req.params.pagenumber) ;
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
                var soTrang;
                var count = data.Count/global.SoItemMoiPageQL;
                res.json(
                    {
                        DanhMuc: data.Items,
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage:global.SoItemMoiPageQL
                    }
                );
            }
        });
    },
    LayDanhMucTheoSoTrang:function(req,res,next){
        var soItemMoiPageQL = parseInt(global.SoItemMoiPageQL) ;
        var n = parseInt(req.params.pagenumber) ;
        var begin =(n-1)* soItemMoiPageQL;
        var end = (n-1)*soItemMoiPageQL +soItemMoiPageQL;
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
                var soTrang;
                var count = data.Count/soItemMoiPageQL;
                res.json(
                    {
                        DanhMuc: data.Items.slice(begin,end),
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage:soItemMoiPageQL
                    }
                );
            }
        });
    },
    /*LayDanhMucTheoSoTrang:function(req,res,next){
        var n = parseInt(req.params.pagenumber) ;
        var begin =(n-1)*1;
        var end = (n-1)*1 +1;
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
                var soTrang;
                var count = data.Count/1;
                res.json(
                    {
                        DanhMuc: data.Items.slice(begin,end),
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage:1
                    }
                );
            }
        });
    },*/
    LayDanhMucTheoTen:function(req,res,next){
        var tenDanhMuc = CustomFunction.BoDau(req.params.tendanhmuc.toString().toLowerCase())  ;
        var param = {
            TableName: "DanhMuc",
            ProjectionExpression:"#yr, TenDanhMuc, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n and contains(TenDanhMuc.TenKhongVietHoa, :m)",
            ExpressionAttributeNames:{
                "#yr":"ID_DanhMuc",
            },
            ExpressionAttributeValues:{
                ":n":false,
                ":m":tenDanhMuc
            }
        };
        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                res.json(data);
            }
        });

    },
    ThemDanhMuc: function (req, res, next) {
        var tenDM = req.params.tendanhmuc;
        var idDM = ids.generate();
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
                    message:"Lỗi hệ thống !"
                });

            }
            else{
                console.log("Thành công!");
                return res.json({
                    status:"ok",
                    message:"Tạo danh mục thành công !",
                    idDM:idDM,
                    tenDM:tenDM
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
                ":m":tenKhongVietHoa
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