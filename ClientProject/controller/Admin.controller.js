const api_helper = require('../routes/API_helper');
const domain = require('../Config/ServerDomain');
var ImageUrlLoad = "https://hqk.s3.us-west-1.amazonaws.com/LoadingIMG/loading.svg";
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
                    urlLoading:ImageUrlLoad,
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
                    urlLoading:ImageUrlLoad,
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
                    urlLoading:ImageUrlLoad,
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
                    urlLoading:ImageUrlLoad,
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
                    urlLoading:ImageUrlLoad,
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
                    urlLoading:ImageUrlLoad,
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
                    urlLoading:ImageUrlLoad,
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
                    urlLoading:ImageUrlLoad,
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
                    urlLoading:ImageUrlLoad,
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
    HienThiQuanLyDonHang_DangCho: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/HoaDons/cho?token=' + req.cookies.token)
            .then(response => {
                var dataHD = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.HoaDon.forEach(function (item) {
                    var hd = {
                        ID_HoaDon: item.ID_HoaDon,
                        TiLeSale: item.TiLeSale,
                        NgayTao: item.NgayTao,
                        ChiTietHoaDon:item.ChiTietHoaDon,
                        ThongTinKhachHang: item.ThongTinKhachHang,
                        MaGiamGia:item.MaGiamGia,
                        TongSoTien:item.TongSoTien,
                        TrangThai:item.TrangThai
                    };
                    dataHD.push(hd);
                });
                res.render('./Admin/QuanLyDonHang_DangCho.ejs', {
                    domain: domain,
                    urlLoading:ImageUrlLoad,
                    title: 'Danh sách đơn hàng đang chờ xử lý',
                    key: 'QLDH_CHO',
                    dataHD: dataHD,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });

    },
    HienThiQuanLyDonHang_DangShip: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/HoaDons/ship?token=' + req.cookies.token)
            .then(response => {
                var dataHD = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.HoaDon.forEach(function (item) {
                    var hd = {
                        ID_HoaDon: item.ID_HoaDon,
                        TiLeSale: item.TiLeSale,
                        NgayTao: item.NgayTao,
                        ChiTietHoaDon:item.ChiTietHoaDon,
                        ThongTinKhachHang: item.ThongTinKhachHang,
                        MaGiamGia:item.MaGiamGia,
                        TongSoTien:item.TongSoTien,
                        TrangThai:item.TrangThai
                    };
                    dataHD.push(hd);
                });
                res.render('./Admin/QuanLyDonHang_DangShip.ejs', {
                    domain: domain,
                    urlLoading:ImageUrlLoad,
                    title: 'Danh sách đơn hàng đang chờ xử lý',
                    key: 'QLDH_SHIP',
                    dataHD: dataHD,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    }, HienThiQuanLyDonHang_HoanThanh: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/HoaDons/ht?token=' + req.cookies.token)
            .then(response => {
                var dataHD = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.HoaDon.forEach(function (item) {
                    var hd = {
                        ID_HoaDon: item.ID_HoaDon,
                        TiLeSale: item.TiLeSale,
                        NgayTao: item.NgayTao,
                        ChiTietHoaDon:item.ChiTietHoaDon,
                        ThongTinKhachHang: item.ThongTinKhachHang,
                        MaGiamGia:item.MaGiamGia,
                        TongSoTien:item.TongSoTien,
                        TrangThai:item.TrangThai
                    };
                    dataHD.push(hd);
                });
                res.render('./Admin/QuanLyDonHang_HoanThanh.ejs', {
                    domain: domain,
                    urlLoading:ImageUrlLoad,
                    title: 'Danh sách đơn hàng đang chờ xử lý',
                    key: 'QLDH_HT',
                    dataHD: dataHD,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    HienThiQuanLyDonHang_Huy: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/HoaDons/huy?token=' + req.cookies.token)
            .then(response => {
                var dataHD = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.HoaDon.forEach(function (item) {
                    var hd = {
                        ID_HoaDon: item.ID_HoaDon,
                        TiLeSale: item.TiLeSale,
                        NgayTao: item.NgayTao,
                        ChiTietHoaDon:item.ChiTietHoaDon,
                        ThongTinKhachHang: item.ThongTinKhachHang,
                        MaGiamGia:item.MaGiamGia,
                        TongSoTien:item.TongSoTien,
                        TrangThai:item.TrangThai
                    };
                    dataHD.push(hd);
                });
                res.render('./Admin/QuanLyDonHang_Huy.ejs', {
                    domain: domain,
                    urlLoading:ImageUrlLoad,
                    title: 'Danh sách đơn hàng đang chờ xử lý',
                    key: 'QLDH_HUY',
                    dataHD: dataHD,
                    soTrang: soTrang,
                    tongItem: tongItem,
                    itemMoiPage: itemMoiPage
                });
            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data " + error);
            });
    },
    ThongKe: function (req, res, next) {
        api_helper.API_Call_Get(domain + '/HoaDons/ht?token=' + req.cookies.token)
            .then(response => {
                var dataHD = [];
                var soTrang = response.SoTrang;
                var tongItem = response.TongItem;
                var itemMoiPage = response.ItemMoiPage;
                response.HoaDon.forEach(function (item) {
                    var hd = {
                        ID_HoaDon: item.ID_HoaDon,
                        TiLeSale: item.TiLeSale,
                        NgayTao: item.NgayTao,
                        ChiTietHoaDon:item.ChiTietHoaDon,
                        ThongTinKhachHang: item.ThongTinKhachHang,
                        MaGiamGia:item.MaGiamGia,
                        TongSoTien:item.TongSoTien,
                        TrangThai:item.TrangThai
                    };
                    dataHD.push(hd);
                });
                res.render('./Admin/ThongKe.ejs', {
                    domain: domain,
                    urlLoading:ImageUrlLoad,
                    title: 'Danh sách đơn hàng đang chờ xử lý',
                    key: 'TK',
                    dataHD: dataHD,
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
                    urlLoading:ImageUrlLoad,
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
            urlLoading:ImageUrlLoad,
            title: 'Đổi mật khẩu',
            key: 'QLCD_DMK',
        });
    },
    DangXuat: function (req, res, next) {
        res.cookie('token', "sa");
        res.redirect('/Admin/DangNhap');
    }
};