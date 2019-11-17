var AWS = require("aws-sdk");
var fs = require('fs');
var configAWS = require("./ConfigAWS");
configAWS.KetNoiAWS();

var docClient = new AWS.DynamoDB.DocumentClient();



// 2 Load Bảng NguoiDung
var allNguoiDung = JSON.parse(fs.readFileSync('../Database/NguoiDung.json', 'utf8'));
allNguoiDung.forEach(function(nguoiDung) {
    var params = {
        TableName: "NguoiDung",
        Item: {
            "ID_NguoiDung":  nguoiDung.ID_NguoiDung,
            "TenNguoiDung": nguoiDung.TenNguoiDung,
            "SoDienThoai":  nguoiDung.SoDienThoai,
            "DiaChi":nguoiDung.MoTa,
            "Email":nguoiDung.Email,
            "VaiTro":nguoiDung.VaiTro,
            "TaiKhoan":nguoiDung.TaiKhoan,
            "NgayTao":nguoiDung.NgayTao,
            "TrangThaiXoa":nguoiDung.TrangThaiXoa,

        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add NguoiDung: ", nguoiDung, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem NguoiDung succeeded:", nguoiDung);
        }
    });
});