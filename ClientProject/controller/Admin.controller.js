const api_helper = require('../routes/API_helper');
const domain = require('../Config/ServerDomain');
const soSP = require('../Config/SoSanPhamMoiTrang');

module.exports = {
    HienThiTrangDangNhap:function(req, res, next) {
        res.render('./Admin/DangNhap.ejs', {domain: domain, title: 'Đăng nhập Admin'});
    },
    HienThiQuanLySanPham:function(req, res, next) {
        res.render('./Admin/QuanLySanPham.ejs', {domain: domain, title: 'Quản lý sản phẩm'});
    },
    HienThiQuanLyDanhMuc:function(req, res, next) {
        res.render('./Admin/QuanLyDanhMuc.ejs', {domain: domain, title: 'Quản lý danh mục'});
    },
    HienThiQuanLyThuongHieu:function(req, res, next) {
        res.render('./Admin/QuanLyThuongHieu.ejs', {domain: domain, title: 'Quản lý thương hiệu'});
    }

};