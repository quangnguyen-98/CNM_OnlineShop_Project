var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
module.exports = {
    KiemTraTrungTen:function (req,res,next) {
        var tenDM = req.params.tendanhmuc;
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
                res.json({
                    status:"fail",
                    message:"Lỗi db !"
                });
            }
            else{
                console.log("Thành công!");
                var mangTrungTen =[];
                data.Items.forEach(function (item) {
                    if(item.TenDanhMuc.Ten.toString().toLowerCase() == tenDM.toString().toLowerCase())
                    mangTrungTen.push(item.TenDanhMuc.Ten);
                });
                if (mangTrungTen.length >= 1){
                    res.json({
                        status:"fail",
                        message:"Tên danh mục bị trùng, vui lòng đặt tên khác !",
                    });
                }
                else {
                    next();
                }
            }
        });
    },
    KiemTraTrungTenKhiSua:function (req,res,next) {
        var idDM = req.params.iddanhmuc;
        var tenDM = req.params.tendanhmuc;
        var param = {
            TableName: "DanhMuc",
            ProjectionExpression:"#yr, TenDanhMuc, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n and  NOT ID_DanhMuc in(:m)",
            ExpressionAttributeNames:{
                "#yr":"ID_DanhMuc",
            },
            ExpressionAttributeValues:{
                ":n":false,
                ":m":idDM
            }
        };
        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Lỗi db !"
                });
            }
            else{
                console.log("Thành công!");
                var mangTrungTen =[];
                data.Items.forEach(function (item) {
                    if(item.TenDanhMuc.Ten.toString().toLowerCase() == tenDM.toString().toLowerCase())
                        mangTrungTen.push(item.TenDanhMuc.Ten);
                });
                if (mangTrungTen.length >= 1){
                    res.json({
                        status:"fail",
                        message:"Tên danh mục bị trùng, vui lòng đặt tên khác !",
                    });
                }
                else {
                    next();
                }
            }
        });
    }
};

