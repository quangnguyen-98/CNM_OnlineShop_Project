const api_helper = require('../routes/API_helper');
const domain = require('../Config/ServerDomain');
const soSP = require('../Config/SoSanPhamMoiTrang');

module.exports = {
    ThayDoi:function (req,res,next) {
        soSP.export = 3;
        res.json(soSP);
    }
};