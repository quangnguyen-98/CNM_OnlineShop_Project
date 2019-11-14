var AWS = require("aws-sdk");
var configAWS = require("../Config/ConfigAWS");
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    LayTatCaFooter: function (req, res, next) {
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                res.json(data);
            }
        });
    },
    LayFooterTT: function (req, res, next) {
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            FilterExpression:"LoaiFooter = :n",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":"TT"
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                res.json(data);
            }
        });
    },
    LayFooterCSKH: function (req, res, next) {
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            FilterExpression:"LoaiFooter = :n",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":"CSKH"
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                res.json(data);
            }
        });
    },
    LayFooterFAQ: function (req, res, next) {
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            FilterExpression:"LoaiFooter = :n",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":"FAQ"
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                res.json(data);
            }
        });
    },
    LayFooterCH: function (req, res, next) {
        var param = {
            TableName: "Footer",
            ProjectionExpression:"#yr, LoaiFooter, TenLienKet, Link",
            FilterExpression:"LoaiFooter = :n",
            ExpressionAttributeNames:{
                "#yr":"ID_Footer",
            },
            ExpressionAttributeValues:{
                ":n":"CH"
            }
        };

        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.end();
            }
            else{
                console.log("Thành công!");
                res.json(data);
            }
        });
    }
}