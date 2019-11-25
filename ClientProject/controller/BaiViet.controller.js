const api_helper = require('../routes/API_helper');
const domain = require('../Config/ServerDomain');

module.exports = {
    HienThiChiTietBaiViet:function(req, res, next) {
        var idbv = req.params.id ;
        api_helper.API_Call_Get(domain+'/BaiViets/TimTheoId/'+idbv)
            .then(response => {
                var bvData;
                response.Items.forEach(function (item) {
                    bvData = {ID_BaiViet:item.BaiViet, TenTieuDe:item.TenTieuDe.Ten, NoiDung:item.NoiDung};
                });
                if(typeof bvData == "undefined"){
                    res.render('error.ejs', { error:{status:404}  });

                }else {
                    res.render('./Admin/ChiTietBaiViet.ejs', {domain: domain, title: 'Blog', bvData: bvData });
                }

            })
            .catch(error => {
                res.render('maintain.ejs');

            });
    }

};