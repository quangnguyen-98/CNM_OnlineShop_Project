var express = require('express');
var AWS = require('aws-sdk');
var router = express.Router();
const s3Object = new AWS.S3({
      accessKeyId : "AKIAJI3SVDGCNLYGR6FA",
      secretAccessKey : "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",
      region: "us-west-1",
      endpoint: "s3.us-west-1.amazonaws.com/"

});


//Khai báo conntroller
var IndexController = require('../controllers/Index.controller');

// Về trang chủ
router.get('/', function(req, res, next) {
      res.json('Well come to Web Service');
});


router.get('/api/getIndex/:pagenumber',IndexController.LayTatCaSanPham_DanhMuc_ThuongHieu);

router.get('/api/uploadanh',function(req,res){
      var fileName = req.query.fileName;
      var type = req.query.type;
      var url = s3Object.getSignedUrl('putObject', {
            Bucket: "hqk",
            Key: fileName,
            Expires: 30,
            ACL: "public-read",
            ContentType: type
      });
      console.log(fileName);

      console.log(url);
      res.send(url);
});



module.exports = router;
