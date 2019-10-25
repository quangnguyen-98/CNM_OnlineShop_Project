var AWS = require("aws-sdk");
var configAWS = require("./ConfigAWS");
configAWS.KetNoiAWSLocal();
var dynamodb = new AWS.DynamoDB();


//Tạo Bảng SanPham
var paramsSanPham = {
    TableName : "SanPham",
    KeySchema: [
        { AttributeName: "ID_SanPham", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_SanPham", AttributeType: "N" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsSanPham, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});


//Tạo Bảng Người Dùng
var paramsNguoiDung = {
    TableName : "NguoiDung",
    KeySchema: [
        { AttributeName: "ID_NguoiDung", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_NguoiDung", AttributeType: "N" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsNguoiDung, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});


//Tạo Bảng Hóa Đơn
var paramsHoaDon = {
    TableName : "HoaDon",
    KeySchema: [
        { AttributeName: "ID_HoaDon", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "ID_HoaDon", AttributeType: "N" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(paramsHoaDon, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});


//Tạo Bảng Chức Năng
var paramsChucNang = {
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
});