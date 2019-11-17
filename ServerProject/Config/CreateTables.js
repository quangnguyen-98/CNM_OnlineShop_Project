var AWS = require("aws-sdk");
var configAWS = require("./ConfigAWS");
configAWS.KetNoiAWS();
var dynamodb = new AWS.DynamoDB();

/*
// 1 Tạo Bảng SanPham
var paramsSanPham = {
    TableName : "SanPham",
    KeySchema: [
        { AttributeName: "ID_SanPham", KeyType: "HASH"},  //Partition key
      /!*  { AttributeName: "TenSanPham", KeyType: "RANGE"},  //Range key*!/

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_SanPham", AttributeType: "S" },
        /!*{ AttributeName: "TenSanPham", AttributeType: "M" },*!/

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsSanPham, function(err, data) {
    if (err) {
        console.error("Unable to create table SanPham. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table SanPham. Table description JSON:", JSON.stringify(data, null, 2));
    }
});*/


// 2 Tạo Bảng Người Dùng
var paramsNguoiDung = {
    TableName : "NguoiDung",
    KeySchema: [
        { AttributeName: "ID_NguoiDung", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_NguoiDung", AttributeType: "S" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsNguoiDung, function(err, data) {
    if (err) {
        console.error("Unable to create table Người Dùng. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table Người Dùng. Table description JSON:", JSON.stringify(data, null, 2));
    }
});


/*// 3 Tạo Bảng Hóa Đơn
var paramsHoaDon = {
    TableName : "HoaDon",
    KeySchema: [
        { AttributeName: "ID_HoaDon", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_HoaDon", AttributeType: "S" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsHoaDon, function(err, data) {
    if (err) {
        console.error("Unable to create table Hóa Đơn. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table Hóa Đơn. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

// 4 Tạo Bảng Danh Mục
var paramsDanhMuc = {
    TableName : "DanhMuc",
    KeySchema: [
        { AttributeName: "ID_DanhMuc", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_DanhMuc", AttributeType: "S" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsDanhMuc, function(err, data) {
    if (err) {
        console.error("Unable to create table Danh Mục. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table Danh Mục. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

// 5 Tạo Bảng Thương Hiệu
var paramsThuongHieu = {
    TableName : "ThuongHieu",
    KeySchema: [
        { AttributeName: "ID_ThuongHieu", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_ThuongHieu", AttributeType: "S" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsThuongHieu, function(err, data) {
    if (err) {
        console.error("Unable to create table Thương Hiệu. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table Thương Hiệu. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

// 6 Tạo Bảng Carousel
var paramsCarousel = {
    TableName : "Carousel",
    KeySchema: [
        { AttributeName: "ID_Carousel", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_Carousel", AttributeType: "S" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsCarousel, function(err, data) {
    if (err) {
        console.error("Unable to create table Carousel. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table Carousel. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

// 7 Tạo Bảng Bài Viết
var paramsBaiViet = {
    TableName : "BaiViet",
    KeySchema: [
        { AttributeName: "ID_BaiViet", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_BaiViet", AttributeType: "S" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsBaiViet, function(err, data) {
    if (err) {
        console.error("Unable to create table Bài Viết. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table Bài Viết. Table description JSON:", JSON.stringify(data, null, 2));
    }
});*/

/*// 8 Tạo Bảng Footer
var paramsFooter = {
    TableName : "Footer",
    KeySchema: [
        { AttributeName: "ID_Footer", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_Footer", AttributeType: "S" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsFooter, function(err, data) {
    if (err) {
        console.error("Unable to create table Footer. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table Footer. Table description JSON:", JSON.stringify(data, null, 2));
    }
});*/

//Tạo Bảng Chức Năng
/*var paramsChucNang = {
    TableName : "ChucNang",
    KeySchema: [
        { AttributeName: "ID_Chucnang", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_Chucnang", AttributeType: "N" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsChucNang, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});*/