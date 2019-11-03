var AWS = require("aws-sdk");
var configAWS = require("./ConfigAWS");
configAWS.KetNoiAWS();

var dynamodb = new AWS.DynamoDB();



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