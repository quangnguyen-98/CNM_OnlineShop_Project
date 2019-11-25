var AWS = require("aws-sdk");
var configAWS = require("./ConfigAWS");
configAWS.KetNoiAWS();

var dynamodb = new AWS.DynamoDB();


// 1 Xóa Bảng SanPham
var paramsSanPham = {
    TableName : "SanPham",
};
dynamodb.deleteTable(paramsSanPham, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table SanPham Deleted. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

// 2 Xóa Bảng NguoiDung
var paramsNguoiDung = {
    TableName : "NguoiDung",
};
dynamodb.deleteTable(paramsNguoiDung, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table NguoiDung Deleted. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

// 3 Xóa Bảng HoaDon
var paramsHoaDon = {
    TableName : "HoaDon",
};
dynamodb.deleteTable(paramsHoaDon, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table HoaDon Deleted. Table description JSON:", JSON.stringify(data, null, 2));
    }
});



// 4 Xóa Bảng Danh Mục
var paramsDanhMuc = {
    TableName : "DanhMuc",
};
dynamodb.deleteTable(paramsDanhMuc, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table DanhMuc Deleted. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

// 5 Xóa Bảng Thương Hiệu
var paramsThuongHieu = {
    TableName : "ThuongHieu",
};
dynamodb.deleteTable(paramsThuongHieu, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table ThuongHieu Deleted. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

// 6 Xóa Bảng Carousel
var paramsCarousel = {
    TableName : "Carousel",
};
dynamodb.deleteTable(paramsCarousel, function(err, data) {
    if (err) {
        console.error("Unable to delete Carousel table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table Carousel Deleted. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

// 7 Xóa Bảng Bài Viết
var paramsBaiViet = {
    TableName : "BaiViet",
};
dynamodb.deleteTable(paramsBaiViet, function(err, data) {
    if (err) {
        console.error("Unable to delete Bài Viết table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table Bài Viết Deleted. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

// 8 Xóa Bảng Footer
var paramsFooter = {
    TableName : "Footer",
};
dynamodb.deleteTable(paramsFooter, function(err, data) {
    if (err) {
        console.error("Unable to delete Footer table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table Footer Deleted. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

// 9 Xóa Bảng Mã Giảm Giá
var paramsMaGiamGia = {
    TableName : "MaGiamGia",
};
dynamodb.deleteTable(paramsMaGiamGia, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table MaGiamGia Deleted. Table description JSON:", JSON.stringify(data, null, 2));
    }
});