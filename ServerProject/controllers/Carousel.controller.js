var AWS = require("aws-sdk");
var configAWS = require("../Config/ConfigAWS");
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    LayTatCaCarousel: function (req, res, next) {
        var param = {
            TableName: "SanPham",
            ProjectionExpression:"#yr, TenSanPham, ID_DanhMMuc, ID_ThuongHieu, MoTa, Gia, TiLeSale, Anh.Avatar, Anh.AvtDetail1, Anh.AvtDetail2, NgayTao.Ngay, NgayTao.Thang, NgayTao.Nam, SoLuong, TrangThai",
            ExpressionAttributeNames:{
                "#yr":"ID_SanPham",
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