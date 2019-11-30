const api_helper = require('../routes/API_helper');
const domain = require('../Config/ServerDomain');

module.exports = {
    HienThiQuanLySanPham: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/SanPhams/QlSp/AdminAll?token=' + req.cookies.token)
            .then(response => {
                var dataSP = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.SanPham.forEach(function (item) {
                    var dm = {ID_SanPham: item.ID_SanPham, TenSanPham: item.TenSanPham, Anh: item.Anh};
                    dataSP.push(dm);
                });
                res.render('./Admin/QuanLySanPham.ejs', {
                    domain: domain,
                    title: 'Quản lý sản phẩm',
                    key: 'QLSP',
                    dataSP: dataSP,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });

    },
    HienThiQuanLySanPhamChiTiet: function (req, res, next) {
        var idSP = req.params.idsanpham;
        var spData;
        var listSize = [];
        var key = true;

        api_helper.API_Call_Get(domain + '/SanPhams/QlSp/Admin/timtheoid/a/b/' + idSP + '?token=' + req.cookies.token)
            .then(response => {
                response.SanPham.forEach(function (item) {
                    spData = {
                        ID_SanPham: item.ID_SanPham,
                        ID_ThuongHieu: item.ID_ThuongHieu,
                        ID_DanhMuc: item.ID_DanhMuc,
                        TenSanPham: item.TenSanPham.Ten,
                        MoTa: item.MoTa,
                        ThongTin: item.ThongTin,
                        Gia: item.Gia,
                        TiLeSale: item.TiLeSale,
                        NgayTao: item.NgayTao,
                        Size: item.Size,
                        TrangThaiBan: item.TrangThaiBan,
                        Anh: item.Anh
                    };
                });
                if(spData == null){
                    res.render('error.ejs',{error:{status:404} });
                }
                response.listSize.forEach(function (item) {
                   var size ={ID_Size:item.ID_Size, TenSize:item.TenSize, SoLuong:item.SoLuong};
                   listSize.push(size);
                });

                if (spData.Gia == null) {
                    key = false;

                }
                res.render('./Admin/QuanLySanPhamChiTiet.ejs', {
                    domain: domain,
                    title: 'Quản lý sản phẩm',
                    key: "QLSPCT",
                    spData: spData,
                    listSize: listSize,
                    key: key
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    HienThiQuanLyDanhMuc: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/DanhMucs?token=' + req.cookies.token)
            .then(response => {
                var dataDM = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.DanhMuc.forEach(function (item) {
                    var dm = {ID_DanhMuc: item.ID_DanhMuc, TenDanhMuc: item.TenDanhMuc};
                    dataDM.push(dm);
                });
                res.render('./Admin/QuanLyDanhMuc.ejs', {
                    domain: domain,
                    title: 'Quản lý danh mục',
                    key: 'QLDM',
                    dataDM: dataDM,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    HienThiQuanLyThuongHieu: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/ThuongHieus?token=' + req.cookies.token)
            .then(response => {
                var dataTH = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.ThuongHieu.forEach(function (item) {
                    var th = {ID_ThuongHieu: item.ID_ThuongHieu, TenThuongHieu: item.TenThuongHieu};
                    dataTH.push(th);
                });
                res.render('./Admin/QuanLyThuongHieu.ejs', {
                    domain: domain,
                    title: 'Quản lý thương hiệu',
                    key: 'QLTH',
                    dataTH: dataTH,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    HienThiQuanLyCarousel: function (req, res, next) {
        /* res.render('./Admin/QuanLyCarousel.ejs', {domain: domain, title: 'Quản lý carousel',key:'QLCRS'});*/
        api_helper.API_Call_Get(domain + '/Carousels?token=' + req.cookies.token)
            .then(response => {
                var dataCRS = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.Carousel.forEach(function (item) {
                    var th = {
                        ID_Carousel: item.ID_Carousel,
                        LinkAnh: item.LinkAnh,
                        LinkBaiViet: item.LinkBaiViet,
                        TenCarousel: item.TenCarousel
                    };
                    dataCRS.push(th);
                });
                res.render('./Admin/QuanLyCarousel.ejs', {
                    domain: domain,
                    title: 'Quản lý carousel',
                    key: 'QLCRS',
                    dataCRS: dataCRS,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    HienThiQuanLyBaiViet: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/BaiViets?token=' + req.cookies.token)
            .then(response => {
                var dataBV = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;

                response.BaiViet.forEach(function (item) {
                    /* var nd = decodeURIComponent(escape(atob(item.NoiDung))).toString();*/
                    var bv = {ID_BaiViet: item.ID_BaiViet, TenTieuDe: item.TenTieuDe, NoiDung: item.NoiDung};
                    dataBV.push(bv);
                });
                res.render('./Admin/QuanLyBaiViet.ejs', {
                    domain: domain,
                    title: 'Quản lý bài viết',
                    key: 'QLBV',
                    dataBV: dataBV,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    HienThiQuanLyFooterMenu: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/Footers/Menu?token=' + req.cookies.token)
            .then(response => {
                var dataFT = [];
                response.Items.forEach(function (item) {
                    var ft = {
                        ID_Footer: item.ID_Footer,
                        Link: item.Link,
                        LoaiFooter: item.LoaiFooter,
                        TenLienKet: item.TenLienKet
                    };
                    dataFT.push(ft);
                });
                res.render('./Admin/QuanLyFooterMenu.ejs', {
                    domain: domain,
                    title: 'Quản lý menu footer',
                    key: 'QLFT_MENU',
                    dataFT: dataFT
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    HienThiQuanLyFooterCH: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/Footers/LayTatCaCuaHang?pagenumber=1&?token=' + req.cookies.token)
            .then(response => {
                var dataCH = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.CuaHang.forEach(function (item) {
                    var ch = {
                        ID_Footer: item.ID_Footer,
                        Link: item.Link,
                        LoaiFooter: item.LoaiFooter,
                        TenLienKet: item.TenLienKet
                    };
                    dataCH.push(ch);
                });
                res.render('./Admin/QuanLyFooterCH.ejs', {
                    domain: domain,
                    title: 'Quản lý chi nhánh',
                    key: 'QLFT_CH',
                    dataCH: dataCH,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    HienThiQuanLyMaGiamGia: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/MaGiamGias?token=' + req.cookies.token)
            .then(response => {
                var dataMGG = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.MaGiamGia.forEach(function (item) {
                    var mgg = {
                        ID_MaGiamGia: item.ID_MaGiamGia,
                        TenMaGiamGia: item.TenMaGiamGia,
                        SoLuong: item.SoLuong,
                        TiLeSale: item.TiLeSale
                    };
                    dataMGG.push(mgg);
                });
                res.render('./Admin/QuanLyMaGiamGia.ejs', {
                    domain: domain,
                    title: 'Quản lý mã giảm giá',
                    key: 'QLMGG',
                    dataMGG: dataMGG,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    HienThiQuanLyDonHang: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/MaGiamGias?token=' + req.cookies.token)
            .then(response => {
                var dataMGG = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.MaGiamGia.forEach(function (item) {
                    var mgg = {
                        ID_MaGiamGia: item.ID_MaGiamGia,
                        TenMaGiamGia: item.TenMaGiamGia,
                        SoLuong: item.SoLuong,
                        TiLeSale: item.TiLeSale
                    };
                    dataMGG.push(mgg);
                });
                res.render('./Admin/QuanLyMaGiamGia.ejs', {
                    domain: domain,
                    title: 'Quản lý mã giảm giá',
                    key: 'QLMGG',
                    dataMGG: dataMGG,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    HienThiQuanLyCaiDatCauHinh: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/CaiDats?token=' + req.cookies.token)
            .then(response => {
                var soSanPhamPMoiPage = response.SoSanPhamPMoiPage;
                var soItemMoiPageQL = response.SoItemMoiPageQL;
                var thoiGianLogin = response.ThoiGianLogin;
                var secretKeyAdmin = response.SecretKeyAdmin;
                res.render('./Admin/QuanLyCaiDatCauHinh.ejs', {
                    domain: domain,
                    title: 'Quản lý menu footer',
                    key: 'QLCD_CH',
                    soSanPhamPMoiPage: soSanPhamPMoiPage,
                    soItemMoiPageQL: soItemMoiPageQL,
                    thoiGianLogin: thoiGianLogin,
                    secretKeyAdmin: secretKeyAdmin
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    HienThiQuanLyCaiDatDoiMK: function (req, res, next) {
        res.render('./Admin/QuanLyCaiDatDoiMK.ejs', {
            domain: domain,
            title: 'Đổi mật khẩu',
            key: 'QLCD_DMK',
        });
    },
    DangXuat: function (req, res, next) {
        res.cookie('token', "sa");
        res.redirect('/Admin/DangNhap');
    }
};