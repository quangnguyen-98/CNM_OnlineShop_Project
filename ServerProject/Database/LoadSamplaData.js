var AWS = require("aws-sdk");
var fs = require('fs');
var configAWS = require("./ConfigAWS");
configAWS.KetNoiAWSLocal();

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Please wait.");


//Load Bảng SanPham
var allSanPham = JSON.parse(fs.readFileSync(__dirname+'/SanPham.json', 'utf8'));
allSanPham.forEach(function(sanPham) {
    var params = {
        TableName: "SanPham",
        Item: {
            "ID_SanPham":  sanPham.ID_SanPham,
            "TenSanPham": sanPham.TenSanPham,
            "DanhMuc":  sanPham.DanhMuc,
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

//Load Bảng NguoiDung
var allNguoiDung = JSON.parse(fs.readFileSync(__dirname+'/NguoiDung.json', 'utf8'));
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
            "TaiKhoan":nguoiDung.Anh,
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


//Load Bảng ChucNang
var allChucNang = JSON.parse(fs.readFileSync(__dirname+'/ChucNang.json', 'utf8'));
allChucNang.forEach(function(chucnang) {
    var params = {
        TableName: "ChucNang",
        Item: {
            "ID_Chucnang":  chucnang.ID_Chucnang,
            "TenChucNang": chucnang.TenChucNang,
            "ThanhPhan":  chucnang.ThanhPhan
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add ChucNang:", chucnang, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem ChucNang succeeded:", chucnang);
        }
    });
});


//Load Bảng HoaDon
var allHoaDon = JSON.parse(fs.readFileSync(__dirname+'/HoaDon.json', 'utf8'));
allHoaDon.forEach(function(hoaDon) {
    var params = {
        TableName: "HoaDon",
        Item: {
            "ID_HoaDon":  hoaDon.ID_HoaDon,
            "NgayTao": hoaDon.NgayTao,
            "ID_KhachHang":  hoaDon.ID_KhachHang,
            "ChiTietHoaDon":hoaDon.ChiTietHoaDon,
            "TongTien":hoaDon.TongTien,
            "TrangThaiThanhToan":hoaDon.TrangThaiThanhToan,

        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add HoaDon:", hoaDon, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem HoaDon succeeded:", hoaDon);
        }
    });
});