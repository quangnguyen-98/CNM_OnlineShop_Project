const api_helper = require('../routes/API_helper');
const domain = require('../Config/ServerDomain');

module.exports = {
    KiemTraToken:function (req,res,next) {
        api_helper.API_Call_Get(domain+'/auth/token?token='+req.cookies.token)
            .then(response => {
                if(response.status == "ok"){
                    next();
                }
                else {
                    res.render('./Admin/DangNhap.ejs', {domain: domain, title: 'Đăng nhập Admin'});
                }

            })
            .catch(error => {
                res.send("Web server chưa được bật, không lấy được data "+error);
            });
    }
}

