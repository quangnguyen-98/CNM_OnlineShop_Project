var express = require('express');
var router = express.Router();

var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var jwt = require('jsonwebtoken');
var AuthValidate = require('../Validator/Auth.validate');
const { check, validationResult } = require('express-validator');
//Khai báo conntroller
var AuthController = require('../controllers/Auth.controller');
var AuthValidate = require('../Validator/Auth.validate');

//Xác thực login user (Web/api/Auth/)
router.get('/:username/:password',AuthValidate.ValidateLogin, AuthController.KiemTraDangNhap);

router.get('/:token', AuthController.KiemTraToken,AuthController.TraKetQuaXacThuc);

module.exports = router;
