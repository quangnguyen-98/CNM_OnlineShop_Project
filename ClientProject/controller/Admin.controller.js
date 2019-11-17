const api_helper = require('../routes/API_helper');
const domain = require('../Config/ServerDomain');
const soSP = require('../Config/SoSanPhamMoiTrang');

module.exports = {
    HienThiQuanLySanPham:function(req, res, next) {
        res.render('./Admin/QuanLySanPham.ejs', {domain: domain, title: 'Quản lý sản phẩm',key:'QLSP'});
    },
    HienThiQuanLyDanhMuc:function(req, res, next) {
        res.render('./Admin/QuanLyDanhMuc.ejs', {domain: domain, title: 'Quản lý danh mục',key:'QLDM'});
    },
    HienThiQuanLyThuongHieu:function(req, res, next) {
        res.render('./Admin/QuanLyThuongHieu.ejs', {domain: domain, title: 'Quản lý thương hiệu',key:'QLTH'});
    },
    HienThiQuanLyCarousel:function(req, res, next) {
        res.render('./Admin/QuanLyCarousel.ejs', {domain: domain, title: 'Quản lý carousel',key:'QLCRS'});
    },
    HienThiQuanLyFooter:function(req, res, next) {
        res.render('./Admin/QuanLyFooter.ejs', {domain: domain, title: 'Quản lý footer',key:'QLFT'});
    },
    DangXuat:function(req, res, next){
        res.cookie('token',"sa");
        res.redirect('/Admin/DangNhap');
    }
};