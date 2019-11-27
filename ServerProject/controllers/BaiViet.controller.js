const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const CustomFunction = require('../Config/CustomFunction');
const ids = require('short-id');
const  DomainBaiViet = require('../Config/ClientDomain');
module.exports = {
    LayTatCaBaiViet: function (req, res, next) {
        var n = parseInt(req.params.pagenumber) ;
        var param = {
            TableName: "BaiViet",
            ProjectionExpression:"#yr, TenTieuDe,NoiDung, LinkBaiViet, NgayTao, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_BaiViet",
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
                var count = data.Count/global.SoItemMoiPageQL;
                res.json(
                    {
                        BaiViet: data.Items,
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage:global.SoItemMoiPageQL
                    }
                );
            }
        });
    },
    LayBaiVietTheoSoTrang:function(req,res,next){
        var soItemMoiPageQL = parseInt(global.SoItemMoiPageQL) ;
        var n = parseInt(req.params.pagenumber) ;
        var begin =(n-1)* soItemMoiPageQL;
        var end = (n-1)*soItemMoiPageQL +soItemMoiPageQL;
        var param = {
            TableName: "BaiViet",
            ProjectionExpression:"#yr, TenTieuDe, NoiDung, LinkBaiViet, NgayTao, SoLuotXem, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_BaiViet",
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
                var count = data.Count/soItemMoiPageQL;
                res.json(
                    {
                        BaiViet: data.Items.slice(begin,end),
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage:soItemMoiPageQL
                    }
                );
            }
        });
    },
    LayBaiVietTheoID:function(req,res,next){
        var idBaiViet = req.params.idbaiviet;
        var param = {
            TableName: "BaiViet",
            ProjectionExpression:"#yr, TenTieuDe,NoiDung, LinkBaiViet, NgayTao, SoLuotXem, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n and #yr = :m",
            ExpressionAttributeNames:{
                "#yr":"ID_BaiViet",
            },
            ExpressionAttributeValues:{
                ":n":false,
                ":m":idBaiViet
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
    LayBaiVietTheoTen:function(req,res,next){
        var tenBaiViet = CustomFunction.BoDau(req.params.tenbaiviet.toString().toLowerCase());
        var param = {
            TableName: "BaiViet",
            ProjectionExpression:"#yr, TenTieuDe,NoiDung, LinkBaiViet, NgayTao, SoLuotXem, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n and contains(TenTieuDe.TenKhongVietHoa, :m)",
            ExpressionAttributeNames:{
                "#yr":"ID_BaiViet",
            },
            ExpressionAttributeValues:{
                ":n":false,
                ":m":tenBaiViet
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
    ThemBaiViet: function (req, res, next) {
        var tenBV = req.params.tenbaiviet;
        var noiDungBV = req.body.noidungbaiviet;
        var idBV = ids.generate();
        var linkBaiViet = DomainBaiViet+idBV;
        var datetime = new Date();

        var paramBV = {
            TableName: "BaiViet",
            Item: {
                "ID_BaiViet": idBV,
                "NoiDung":noiDungBV,
                "TenTieuDe": {
                    "Ten":tenBV,
                    "TenKhongVietHoa": CustomFunction.BoDau(tenBV.toLowerCase())
                },
                "LinkBaiViet":linkBaiViet,
                "NgayTao": {
                    "Nam": parseInt(datetime.getFullYear())  ,
                    "Ngay": parseInt(datetime.getDate()) ,
                    "Thang": parseInt( datetime.getMonth())+1
                },
                "SoLuotXem":0,
                "TrangThaiXoa": false
            }
        };

        docClient.put(paramBV,function (err,data) {
            if (err) {
                console.error(err);
                return res.json({
                    status:"fail",
                    message:"Nội dung bài viết không được để trống !"
                });

            }
            else{
                console.log("Thành công!");
                return res.json({
                    status:"ok",
                    message:"Tạo bài viết thành công !",
                    idBV:idBV,
                    tenBV:tenBV,
                    noidungBV:noiDungBV
                });
            }
        });
    },
    SuaBaiViet: function (req, res, next) {
        var idBV = req.params.idbaiviet;
        var tenBV = req.params.tenbaiviet;
        var noiDungBV = req.body.noidungbaiviet;
        var tenKhongVietHoa = CustomFunction.BoDau(tenBV.toLowerCase());
        var param = {
            TableName:'BaiViet',
            Key:{
                "ID_BaiViet": idBV
            },
            UpdateExpression: "set TenTieuDe.Ten = :n, TenTieuDe.TenKhongVietHoa = :m, NoiDung = :k",
            ExpressionAttributeValues:{
                ":n": tenBV,
                ":m":tenKhongVietHoa,
                ":k":noiDungBV
            },
            ReturnValues:"UPDATED_NEW"
        };


        docClient.update(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Nội dung bài viết không được để trống !",
                    idBV:idBV,
                    noidungBV:noiDungBV
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Sửa bài viết thành công !",
                    idBV:idBV,
                    tendm:tenBV,
                    noidungBV:noiDungBV
                });
            }
        });
    },
    XoaBaiViet: function (req, res, next) {
        var idBV = req.params.idbaiviet;
        var param = {
            TableName:'BaiViet',
            Key:{
                "ID_BaiViet": idBV
            },
            UpdateExpression: "set TrangThaiXoa = :n, LinkBaiViet =:m",
            ExpressionAttributeValues:{
                ":n": true,
                ":m":"Xoa"
            },
            ReturnValues:"UPDATED_NEW"
        };


        docClient.update(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Xóa bài viết thất bại !",
                    idBV:idBV
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Xóa bài viết thành công !",
                    idBV:idBV
                });
            }
        });
    },
    TangSoLuotXem: function (req, res, next) {
        var idBV = req.params.idbaiviet;
        var parambv = {
            TableName: "BaiViet",
            ProjectionExpression:"#yr,SoLuotXem",
            FilterExpression:"TrangThaiXoa =:n and #yr = :m",
            ExpressionAttributeNames:{
                "#yr":"ID_BaiViet",
            },
            ExpressionAttributeValues:{
                ":n":false,
                ":m":idBV
            }
        };
        docClient.scan(parambv,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                // res.json(data.Items[0].SoLuotXem);
                var soLuotXem = parseInt(data.Items[0].SoLuotXem) +1 ;
                var param = {
                    TableName:'BaiViet',
                    Key:{
                        "ID_BaiViet": idBV
                    },
                    UpdateExpression: "set SoLuotXem = :n",
                    ExpressionAttributeValues:{
                        ":n": soLuotXem
                    },
                    ReturnValues:"UPDATED_NEW"
                };

                docClient.update(param,function (err,data) {
                    if (err) {
                        console.error(err);
                        res.json({
                            status:"fail",
                            message:"Tăng lượt xem thất bại !",
                            idBV:idBV,
                        });
                    }
                    else{
                        console.log("Thành công!");
                        res.json({
                            status:"ok",
                            message:"Tăng lượt xem thành công !",
                            idBV:idBV
                        });
                    }
                });
            }
        });



    },
}