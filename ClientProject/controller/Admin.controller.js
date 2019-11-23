const api_helper = require('../routes/API_helper');
const domain = require('../Config/ServerDomain');
const soSP = require('../Config/SoSanPhamMoiTrang');

module.exports = {
    HienThiQuanLySanPham:function(req, res, next) {
        res.render('./Admin/QuanLySanPham.ejs', {domain: domain, title: 'Quản lý sản phẩm',key:'QLSP'});
    },
    HienThiQuanLyDanhMuc:function(req, res, next) {
        api_helper.API_Call_Get(domain+'/DanhMucs?token='+req.cookies.token)
            .then(response => {
                var dataDM =  [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response. ItemMoiPage;
                response.DanhMuc.forEach(function (item) {
                    var dm ={ID_DanhMuc:item.ID_DanhMuc, TenDanhMuc:item.TenDanhMuc};
                    dataDM.push(dm);
                });
                res.render('./Admin/QuanLyDanhMuc.ejs', { domain: domain, title: 'Quản lý danh mục',key:'QLDM', dataDM:dataDM, soTrang:soTrang, tongItem:tongItem, itemMoiPage:itemMoiPage});
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data "+error);
            });
    },
    HienThiQuanLyThuongHieu:function(req, res, next) {
        api_helper.API_Call_Get(domain+'/ThuongHieus?token='+req.cookies.token)
            .then(response => {
                var dataTH =  [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response. ItemMoiPage;
                response.ThuongHieu.forEach(function (item) {
                    var th ={ID_ThuongHieu:item.ID_ThuongHieu, TenThuongHieu:item.TenThuongHieu};
                    dataTH.push(th);
                });
                res.render('./Admin/QuanLyThuongHieu.ejs', { domain: domain, title: 'Quản lý thương hiệu', key:'QLTH', dataTH:dataTH, soTrang:soTrang, tongItem:tongItem, itemMoiPage:itemMoiPage });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data "+error);
            });
    },
    HienThiQuanLyCarousel:function(req, res, next) {
       /* res.render('./Admin/QuanLyCarousel.ejs', {domain: domain, title: 'Quản lý carousel',key:'QLCRS'});*/
        api_helper.API_Call_Get(domain+'/Carousels?token='+req.cookies.token)
            .then(response => {
                var dataCRS =  [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response. ItemMoiPage;
                response.Carousel.forEach(function (item) {
                    var th ={ID_Carousel:item.ID_Carousel, LinkAnh:item.LinkAnh, LinkBaiViet:item.LinkBaiViet, TenCarousel:item.TenCarousel};
                    dataCRS.push(th);
                });
                res.render('./Admin/QuanLyCarousel.ejs', { domain: domain, title: 'Quản lý carousel', key:'QLCRS', dataCRS:dataCRS, soTrang:soTrang, tongItem:tongItem, itemMoiPage:itemMoiPage });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data "+error);
            });
    },
    HienThiQuanLyBaiViet:function(req, res, next) {
        res.render('./Admin/QuanLyBaiViet.ejs', {domain: domain, title: 'Quản lý bài viết',key:'QLBV'});
    },
    HienThiQuanLyFooterMenu:function(req,res,next){
        api_helper.API_Call_Get(domain+'/Footers/Menu?token='+req.cookies.token)
            .then(response => {
                var dataFT =  [];
                response.Items.forEach(function (item) {
                    var ft ={ID_Footer:item.ID_Footer, Link:item.Link, LoaiFooter:item.LoaiFooter,TenLienKet:item.TenLienKet};
                    dataFT.push(ft);
                });
                res.render('./Admin/QuanLyFooterMenu.ejs', { domain: domain, title: 'Quản lý menu footer',key:'QLFT_MENU', dataFT:dataFT});
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data "+error);
            });
    },
    HienThiQuanLyFooterCH:function(req,res,next){
        api_helper.API_Call_Get(domain+'/Footers/LayTatCaCuaHang?pagenumber=1&?token='+req.cookies.token)
            .then(response => {
                var dataCH =  [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response. ItemMoiPage;
                response.CuaHang.forEach(function (item) {
                    var ch ={ID_Footer:item.ID_Footer, Link:item.Link, LoaiFooter:item.LoaiFooter,TenLienKet:item.TenLienKet};
                    dataCH.push(ch);
                });
                res.render('./Admin/QuanLyFooterCH.ejs', { domain: domain, title: 'Quản lý chi nhánh',key:'QLFT_CH', dataCH:dataCH, soTrang:soTrang, tongItem:tongItem, itemMoiPage:itemMoiPage});
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data "+error);
            });
    },
    DangXuat:function(req, res, next){
        res.cookie('token',"sa");
        res.redirect('/Admin/DangNhap');
    }
};