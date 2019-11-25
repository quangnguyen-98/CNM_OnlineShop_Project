var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
const CustomFunction = require('../Config/CustomFunction');
const ids = require('short-id');
const path = require('path');
const fs = require('fs');/*
const SoItemMoiPage =parseInt(fs.readFileSync(path.resolve(__dirname, "../Config/SoItemMoiPage_QuanLy.txt"))) ;*/
module.exports = {
    LayTatCaCuaHang: function (req, res, next) {
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            FilterExpression:"LoaiFooter = :n and TrangThaiXoa =:m",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":"CH",
                ":m":false
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
                        CuaHang: data.Items,
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage:global.SoItemMoiPageQL
                    }
                );
            }
        });
    },
    LayCuaHangTheoSoTrang: function (req, res, next) {
        var n = parseInt(req.query.pagenumber) ;
        var soItemMoiPageQL = parseInt(global.SoItemMoiPageQL) ;
        var begin =(n-1)*soItemMoiPageQL;
        var end = (n-1)*soItemMoiPageQL + soItemMoiPageQL;
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            FilterExpression:"LoaiFooter = :n and TrangThaiXoa =:m",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":"CH",
                ":m":false
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
                        CuaHang: data.Items.slice(begin,end),
                        SoTrang: Math.ceil(count),
                        TongItem: data.Count,
                        ItemMoiPage:soItemMoiPageQL
                    }
                );
            }
        });
    },
    LayCuaHangTheoTen:function(req,res,next){

        var tenCuaHang = CustomFunction.BoDau(req.query.tencuahang.toString().toLowerCase()) ;
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, TenLienKet, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n and contains(TenLienKet.TenKhongVietHoa, :m)",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":false,
                ":m":tenCuaHang
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
    ThemCuaHang: function (req, res, next) {
        var tenCH = req.params.tencuahang;
        var idCH = ids.generate();
        var paramCH = {
            TableName: "Footer",
            Item: {
                "ID_Footer": idCH,
                "LoaiFooter":"CH",
                "TenLienKet": {
                    "Ten":tenCH,
                    "TenKhongVietHoa": CustomFunction.BoDau(tenCH.toLowerCase())
                },
                "TrangThaiXoa": false
            }
        };

        docClient.put(paramCH,function (err,data) {
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
                    message:"Thêm chi nhánh thành công !",
                    idCH:idCH,
                    tenCH:tenCH
                });
            }
        });
    },
    XoaCuaHang: function (req, res, next) {
        var idCH = req.params.idcuahang;
        var param = {
            TableName:'Footer',
            Key:{
                "ID_Footer": idCH
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
                    message:"Xóa cửa hàngc thất bại !",
                    idCH:idCH
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Xóa cửa hàng thành công !",
                    idCH:idCH
                });
            }
        });
    },
    LayFooterTT: function (req, res, next) {
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            FilterExpression:"LoaiFooter = :n",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":"TT"
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                res.status(200).json(data);
            }
        });
    },
    LayFooterCSKH: function (req, res, next) {
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            FilterExpression:"LoaiFooter = :n",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":"CSKH"
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                res.status(200).json(data);
            }
        });
    },
    LayFooterFAQ: function (req, res, next) {
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            FilterExpression:"LoaiFooter = :n",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":"FAQ"
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                res.status(200).json(data);
            }
        });
    },
    LayFooterCH: function (req, res, next) {
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            FilterExpression:"LoaiFooter = :n and TrangThaiXoa =:m",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":"CH",
                ":m":false
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                res.status(200).json(data);
            }
        });
    },
    LayFooterMenu: function (req, res, next) {
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            FilterExpression:"NOT LoaiFooter in (:n)",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":"CH",
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                res.status(200).json(data);
            }
        });
    },
    SuaMenuFooter: function (req, res, next) {
        var idFT = req.params.idfooter;
        var link = atob(req.params.lienket.replace(/_/g, '/').replace(/-/g, '+')) ;
        var link1 = req.body.lienket ;
        var param = {
            TableName:'Footer',
            Key:{
                "ID_Footer": idFT
            },
            UpdateExpression: "set Link = :n",
            ExpressionAttributeValues:{
                ":n": link1
            },
            ReturnValues:"UPDATED_NEW"
        };

        docClient.update(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Sửa footer thất bại !",
                    idDM:idFT
                });
            }
            else{
                console.log("Thành công!");
                res.json({
                    status:"ok",
                    message:"Sửa footer thành công !",
                    idDM:idFT,
                    Link:link1
                });
            }
        });
    },
}