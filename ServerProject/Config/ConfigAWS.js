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
    KetNoiAWSVirnigia: function() {
        var AWS = require("aws-sdk");
        AWS.config.update({
            region: "us-east-1",
            endpoint: "http://dynamodb.us-east-1.amazonaws.com/",
            accessKeyId:"AKIASUBOKNNVUTTPRMZ3",
            secretAccessKey:"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"
        });
    },
    KetNoiAWS: function() {
        var AWS = require("aws-sdk");
        AWS.config.update({
            region: "us-west-1",
            endpoint: "http://dynamodb.us-west-1.amazonaws.com/",
            accessKeyId:"AKIAJI3SVDGCNLYGR6FA",
            secretAccessKey:"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"
        });
    }

    //region california
    //dynamodb.us-east-1.amazonaws.com

    //region vinnigia
    //dynamodb.us-east-1.amazonaws.com
};