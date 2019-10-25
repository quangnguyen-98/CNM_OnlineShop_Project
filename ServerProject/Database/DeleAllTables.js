var AWS = require("aws-sdk");
var configAWS = require("./ConfigAWS");
configAWS.KetNoiAWSLocal();

var dynamodb = new AWS.DynamoDB();


//Xóa Bảng SanPham
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

//Xóa Bảng NguoiDung
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

//Xóa Bảng HoaDon
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

//Xóa Bảng ChucNang
var paramsChucNang = {
    TableName : "ChucNang",
};
dynamodb.deleteTable(paramsChucNang, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table ChucNang Deleted. Table description JSON:", JSON.stringify(data, null, 2));
    }
});