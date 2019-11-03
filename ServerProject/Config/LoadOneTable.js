var AWS = require("aws-sdk");
var fs = require('fs');
var configAWS = require("./ConfigAWS");
configAWS.KetNoiAWS();

var docClient = new AWS.DynamoDB.DocumentClient();



//Load Bảng SanPham
var allSanPham = JSON.parse(fs.readFileSync('../Database/SanPham.json', 'utf8'));
allSanPham.forEach(function(sanPham) {
    var params = {
        TableName: "SanPham",
        Item: {
            "ID_SanPham":  sanPham.ID_SanPham,
            "TenSanPham": sanPham.TenSanPham,
            "ID_DanhMuc":  sanPham.ID_DanhMuc,
            "ID_ThuongHieu":sanPham.ID_ThuongHieu,
            "MoTa":sanPham.MoTa,
            "Gia":sanPham.Gia,
            "TiLeSale":sanPham.TiLeSale,
            "Anh":sanPham.Anh,
            "NgayTao":sanPham.NgayTao,
            "SoLuong":sanPham.SoLuong,
            "TrangThai":sanPham.TrangThai,
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add SanPham: ", sanPham, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem SanPham succeeded:", sanPham);
        }
    });
});