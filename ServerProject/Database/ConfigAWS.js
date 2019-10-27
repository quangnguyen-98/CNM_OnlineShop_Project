module.exports = {
    KetNoiAWSLocal: function() {
        var AWS = require("aws-sdk");
        AWS.config.update({
            region: "us-west-2",
            endpoint: "http://localhost:8000",
            accessKeyId:"quang1",
            secretAccessKey:"quang2"
        });
    },
    KetNoiAWSReal: function() {
        var AWS = require("aws-sdk");

        AWS.config.update({
            region: "us-west-1",
            endpoint: "http://dynamodb.us-west-1.amazonaws.com/",
            accessKeyId:"AKIASUBOKNNVUTTPRMZ3",
            secretAccessKey:"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"
        });
    },
    KetNoiAWS: function() {
        var AWS = require("aws-sdk");

        AWS.config.update({
            region: "us-west-1",
            endpoint: "http://dynamodb.us-west-1.amazonaws.com/",
            accessKeyId:"AKIASUBOKNNVUTTPRMZ3",
            secretAccessKey:"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"
        });
    }
};