var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
module.exports ={
    KiemTraTrungTen:function (req,res,next) {
        var tenTH = req.params.tenthuonghieu;
        var param = {
            TableName: "ThuongHieu",
            ProjectionExpression:"#yr, TenThuongHieu, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_ThuongHieu",
            },
            ExpressionAttributeValues:{
                ":n":false,
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
                    if(item.TenThuongHieu.Ten.toString().toLowerCase().trim() == tenTH.toString().toLowerCase().trim())
                        mangTrungTen.push(item.TenThuongHieu.Ten);
                });
                if (mangTrungTen.length >= 1){
                    res.json({
                        status:"fail",
                        message:"Tên thương hiệu bị trùng, vui lòng đặt tên khác !",
                    });
                }
                else {
                    next();
                }
            }
        });
    },
    KiemTraTrungTenKhiSua:function (req,res,next) {
        var idTH = req.params.idthuonghieu;
        var tenTH = req.params.tenthuonghieu;
        var param = {
            TableName: "ThuongHieu",
            ProjectionExpression:"#yr, TenThuongHieu, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n and  NOT ID_ThuongHieu in(:m)",
            ExpressionAttributeNames:{
                "#yr":"ID_ThuongHieu",
            },
            ExpressionAttributeValues:{
                ":n":false,
                ":m":idTH
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
                    if(item.TenThuongHieu.Ten.toString().toLowerCase() == tenTH.toString().toLowerCase())
                        mangTrungTen.push(item.TenThuongHieu.Ten);
                });
                if (mangTrungTen.length >= 1){
                    res.json({
                        status:"fail",
                        message:"Tên thương hiệu bị trùng, vui lòng đặt tên khác !",
                    });
                }
                else {
                    next();
                }
            }
        });
    }
}