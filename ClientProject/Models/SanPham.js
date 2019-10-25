var SanPham = [];
exports.update = exports.create = function(ID_SanPham, TenSanPham, ID_DanhMuc, TenDanhMuc, MoTa, Gia, TiLeSale, Avatar,AvtDetail1,AvtDetail2,AvtDetail3,Ngay,Thang,Nam,SoLuong,TrangThai) {
    notes[ID_SanPham] = { ID_SanPham: ID_SanPham, TenSanPham: TenSanPhamm,ID_DanhMuc:ID_DanhMuc,TenDanhMuc:TenDanhMuc,MoTa:MoTa, Gia:Gia,TiLeSale:TiLeSale,Avatar:Avatar,AvtDetail1:AvtDetail1, AvtDetail2:AvtDetail2,AvtDetail3:AvtDetail3,Ngay:Ngay,Thang:Thang,Nam:Nam,Soluong:SoLuong,TrangThai:TrangThai };
}

exports.read = function(ID_SanPham) {
    return SanPham[ID_SanPham];
}

exports.destroy = function(ID_SanPham) {
    delete SanPham[ID_SanPham];
}

exports.keys = function() {
    return Object.keys(SanPham);
}