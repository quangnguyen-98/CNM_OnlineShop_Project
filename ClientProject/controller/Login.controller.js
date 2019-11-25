const api_helper = require('../routes/API_helper');
const domain = require('../Config/ServerDomain');

module.exports = {
    HienThiTrangDangNhap:function(req, res, next) {
        res.render('./Admin/DangNhap.ejs', {domain: domain, title: 'Đăng nhập Admin'});
    },
    KiemTraDangNhap:function (req,res,next) {

        api_helper.API_Call_Get(domain+'/auth/'+req.body.userName+'/'+req.body.passWord+'?check='+req.body.check+'&vaitro=AD')
            .then(response => {
                if(response.status == "ok"){
                    res.cookie('token', response.token.toString());
                    res.cookie('userId',response.userId);
                    /*res.render('./Admin/QuanLySanPham.ejs', {domain: domain, title: 'Đăng nhập Admin'});*/
                    res.redirect('/Admin/QuanLySanPham');
                }
                else {
                    res.render('./Admin/DangNhap.ejs', {domain: domain, title: 'Đăng nhập Admin', err:response.message, values:req.body});

                }

            })
            .catch(error => {
                var err="Mật khẩu có chứa kí tự đặc biệt, vui lòng nhập lại mật khẩu !";
                res.render('./Admin/DangNhap.ejs', {domain: domain, title: 'Đăng nhập Admin', err:err, values:req.body});
            });

    },
};