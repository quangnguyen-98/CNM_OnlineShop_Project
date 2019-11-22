module.exports ={
    KiemTraTrungTen:function (req,res,next) {
        var tenDM = req.params.tenthuonghieu;
        var param = {
            TableName: "ThuongHieu",
            ProjectionExpression:"#yr, TenThuongHieu, TrangThaiXoa",
            FilterExpression:"TrangThaiXoa =:n",
            ExpressionAttributeNames:{
                "#yr":"ID_ThuongHieu",
            },
            ExpressionAttributeValues:{
                ":n":false
            }
        };
        docClient.scan(param,function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    status:"fail",
                    message:"Lỗi db !"
                });
            }
            else{
                console.log("Thành công!");
                var mangTrungTen =[];
                data.Items.forEach(function (item) {
                    if(item.TenThuongHieu.Ten.toString().toLowerCase() == tenDM.toString().toLowerCase())
                        mangTrungTen.push(item.TenThuongHieu.Ten);
                });
                if (mangTrungTen.length >= 1){
                    res.json({
                        status:"fail",
                        message:"Tên thương hiệu bị trùng, vui lòng đặt tên khác !",
                    });
                }
                else {
                    next();
                }
            }
        });
    }
}