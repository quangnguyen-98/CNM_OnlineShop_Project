var AWS = require("aws-sdk");
var configAWS = require("../Config/ConfigAWS");
var ids = require('short-id');
var docClient = new AWS.DynamoDB.DocumentClient();
module.exports = {
    LayTatCaSanPham_DanhMuc_ThuongHieu:function(req, res, next) {

        var paramSP = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, TenSanPham, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2",
            ExpressionAttributeNames:{
                "#yr":"ID_SanPham",
            }
        };
        var paramDM = {
            TableName: "DanhMuc",
            ProjectionExpression:"#yr, TenDanhMuc",
            ExpressionAttributeNames:{
                "#yr":"ID_DanhMuc",
            }
        };
        var paramTH = {
            TableName: "ThuongHieu",
            ProjectionExpression:"#yr, TenThuongHieu",
            ExpressionAttributeNames:{
                "#yr":"ID_ThuongHieu",
            }
        };

        docClient.scan(paramSP,function (err,dataSP) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                docClient.scan(paramDM,function (err, dataDM) {
                    if (err){
                        console.error(err);
                        res.end();
                    }
                    else {
                        docClient.scan(paramTH,function (err, dataTH) {
                            if (err){
                                console.error(err);
                                res.end();
                            }
                            else {
                                res.json(
                                    {
                                        SanPham:dataSP.Items,
                                        DanhMuc:dataDM.Items,
                                        ThuongHieu:dataTH.Items
                                    }
                                );
                            }
                        })
                    }
                });
            }
        });

    },
};

