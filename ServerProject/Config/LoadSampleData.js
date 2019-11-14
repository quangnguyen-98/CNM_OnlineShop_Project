var AWS = require("aws-sdk");
var fs = require('fs');
var configAWS = require("./ConfigAWS");
configAWS.KetNoiAWS();

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Please wait.");


/*// 1 Load Bảng SanPham
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
            "ThongTin":sanPham.ThongTin,
            "Gia":sanPham.Gia,
            "TiLeSale":sanPham.TiLeSale,
            "Anh":sanPham.Anh,
            "NgayTao":sanPham.NgayTao,
            "Size":sanPham.Size,
            "TongSoLuong":sanPham.TongSoLuong,
            "TrangThaiBan":sanPham.TrangThaiBan,
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add SanPham: ", sanPham, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem SanPham succeeded:", sanPham);
        }
    });
});*/

/*// 2 Load Bảng NguoiDung
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


// 3 Load Bảng HoaDon
var allHoaDon = JSON.parse(fs.readFileSync('../Database/HoaDon.json', 'utf8'));
allHoaDon.forEach(function(hoaDon) {
    var params = {
        TableName: "HoaDon",
        Item: {
            "ID_HoaDon":  hoaDon.ID_HoaDon,
            "NgayTao": hoaDon.NgayTao,
            "ThongTinKhachHang":  hoaDon.ThongTinKhachHang,
            "ChiTietDonDat":hoaDon.ChiTietDonDat,
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

// 4 Load Bảng Danh Mục
var allDanhMuc = JSON.parse(fs.readFileSync('../Database/DanhMuc.json', 'utf8'));
allDanhMuc.forEach(function(danhMuc)
{
    var params = {
        TableName: "DanhMuc",
        Item: {
            "ID_DanhMuc":  danhMuc.ID_DanhMuc,
            "TenDanhMuc": danhMuc.TenDanhMuc,
            "TrangThaiXoa":danhMuc.TrangThaiXoa
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add DanhMuc:", danhMuc, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem DanhMuc succeeded:", danhMuc);
        }
    });
});

// 5 Load Bảng Thương Hiệu
var allThuongHieu = JSON.parse(fs.readFileSync('../Database/ThuongHieu.json', 'utf8'));
allThuongHieu.forEach(function(thuongHieu)
{
    var params = {
        TableName: "ThuongHieu",
        Item: {
            "ID_ThuongHieu":  thuongHieu.ID_ThuongHieu,
            "TenThuongHieu": thuongHieu.TenThuongHieu,
            "TrangThaiXoa":thuongHieu.TrangThaiXoa
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add ThuongHieu:", thuongHieu, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem ThuongHieu succeeded:", thuongHieu);
        }
    });
});

// 6 Load Bảng Carousel
var allCarousel = JSON.parse(fs.readFileSync('../Database/Carousel.json', 'utf8'));
allCarousel.forEach(function(carousel)
{
    var params = {
        TableName: "Carousel",
        Item: {
            "ID_Carousel":  carousel.ID_Carousel,
            "LinkAnh": carousel.LinkAnh,
            "LinkBaiViet":carousel.LinkBaiViet
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add Carousel:", carousel, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem Carousel succeeded:", carousel);
        }
    });
});

// 7 Load Bảng BaiViet
var allBaiViet = JSON.parse(fs.readFileSync('../Database/BaiViet.json', 'utf8'));
allBaiViet.forEach(function(baiviet)
{
    var params = {
        TableName: "BaiViet",
        Item: {
            "ID_BaiViet":  baiviet.ID_BaiViet,
            "TieuDe": baiviet.TieuDe,
            "NoiDung":baiviet.NoiDung
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add BaiViet:", baiviet, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem BaiViet succeeded:", baiviet);
        }
    });
});*/



// 8 Load Bảng Footer
var allFooter = JSON.parse(fs.readFileSync('../Database/Footer.json', 'utf8'));
allFooter.forEach(function(footer)
{
    var params = {
        TableName: "Footer",
        Item: {
            "ID_Footer":footer.ID_Footer,
            "LoaiFooter":footer.LoaiFooter,
            "TenLienKet":footer.TenLienKet,
            "Link":footer.Link
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add Footer:", footer, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem Footer succeeded:", footer);
        }
    });
});



/*//Load Bảng ChucNang
var allChucNang = JSON.parse(fs.readFileSync('../Database/ChucNang.json', 'utf8'));
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
});*/