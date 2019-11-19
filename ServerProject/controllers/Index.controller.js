var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var ids = require('short-id');
var fs = require('fs');
const path = require("path");
module.exports = {
    LayTatCaSanPham_DanhMuc_ThuongHieu:function(req, res, next) {
        var n = parseInt(req.params.pagenumber) || 1 ;
        var soItemMoiPage= parseInt(fs.readFileSync(path.resolve(__dirname, "../Config/SoItemMoiPage.txt")));
        var begin =(n-1)*soItemMoiPage;
        var end = (n-1)*soItemMoiPage +soItemMoiPage;

        var paramSP = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, Anh.Avatar, Anh.AvtDetail1",
            FilterExpression:"TrangThaiXoa =:n and TrangThaiBan =:m",
            ExpressionAttributeNames:{
                "#yr":"ID_SanPham",

            },
            ExpressionAttributeValues:{
                ":n": false,
                ":m": true
            }
        };
        var paramDM = {
            TableName: "DanhMuc",
            ProjectionExpression:"#yr, TenDanhMuc",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_DanhMuc",
            },
            ExpressionAttributeValues:{
                ":n": false
            }
        };
        var paramTH = {
            TableName: "ThuongHieu",
            ProjectionExpression:"#yr, TenThuongHieu",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_ThuongHieu",
            },
            ExpressionAttributeValues:{
                ":n": false
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
                                var soTrang;
                                var count = dataSP.Count/soItemMoiPage;
                                res.json(
                                    {
                                        SanPham:dataSP.Items,
                                        DanhMuc:dataDM.Items,
                                        ThuongHieu:dataTH.Items,
                                        SoTrang: Math.ceil(count)
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

