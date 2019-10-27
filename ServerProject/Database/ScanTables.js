var AWS = require("aws-sdk");
var configAWS = require("./ConfigAWS");
configAWS.KetNoiAWS();

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "SanPham",


};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(movie) {
            console.log(
                movie.ID_SanPham +"|"+ movie.TenSanPham);

        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}