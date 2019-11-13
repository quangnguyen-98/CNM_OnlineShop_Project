const api_helper = require('../routes/API_helper');
const domain = require('../Config/ServerDomain');
module.exports = {
    LayDuLieuTuAPITraVeView:function(req, res, next) {
        api_helper.API_Call_Get(domain+'/getIndex/1')
            .then(response => {
                var dataSP =  [];
                var dataDM =  [];
                var dataTH =  [];
                var soTrang = response.SoTrang;

                response.SanPham.forEach(function (item) {
                    var sp = {ID_SanPham:item.ID_SanPham, TenSanPham:item.TenSanPham.Ten,Gia:item.Gia,TiLeSale:item.TiLeSale, Avatar:item.Anh.Avatar,AvtDetail1:item.Anh.AvtDetail1};
                    dataSP.push(sp);
                });
                response.DanhMuc.forEach(function (item) {
                    var dm ={ID_DanhMuc:item.ID_DanhMuc, TenDanhMuc:item.TenDanhMuc};
                    dataDM.push(dm);
                });
                response.ThuongHieu.forEach(function (item) {
                    var th ={ID_ThuongHieu:item.ID_ThuongHieu, TenThuongHieu:item.TenThuongHieu};
                    dataTH.push(th);
                });
                res.render('index.ejs', {domain: domain, title: 'Express', dataSP: dataSP, dataDM:dataDM, dataTH:dataTH , soTrang:soTrang});
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data "+error);
            });
    }
};