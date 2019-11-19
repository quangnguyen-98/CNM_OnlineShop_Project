const { check} = require('express-validator');
module.exports = {
    ValidateLoginDemo:function (req,res,next) {
        check('username','khong duoc trong').not().isEmpty();
        check('password','it nhat 5 chu').isLength({ min: 5 });
        const errors = validationResult;
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    },
    ValidateLogin:[
        check('username','khong duoc trong').not().isEmpty(),
        check('password','it nhat 5 chu').isLength({ min: 5 })
    ]


};

