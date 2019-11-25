const api_helper = require('../routes/API_helper');
const domain = require('../Config/ServerDomain');

module.exports = {
    ThayDoi:function (req,res,next) {
        soSP.export = 3;
        res.json(soSP);
    }
};