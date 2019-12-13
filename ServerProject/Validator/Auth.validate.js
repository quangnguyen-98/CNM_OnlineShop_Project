const { check} = require('express-validator');
module.exports = {
    ValidateLogin:[
        check('username','khong duoc trong').not().isEmpty(),
        check('password','it nhat 5 chu').isLength({ min: 5 })
    ]

};

