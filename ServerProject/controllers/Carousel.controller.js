var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    LayTatCaCarousel: function (req, res, next) {
        var param = {
            TableName: "Carousel",
            ProjectionExpression:"#yr, LinkAnh, LinkBaiViet",
            ExpressionAttributeNames:{
                "#yr":"ID_Carousel",
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                /* res.end(JSON.stringify(data.Items.slice(0,2)));*/
                res.json(data);
            }
        });
    }
}