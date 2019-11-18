var express = require('express');
var router = express.Router();

//Khai báo conntroller
var DanhMucController = require('../controllers/DanhMuc.controller');

//Lấy tất cả danhmuc  (Web/api/DanhMuc/)
router.get('/', DanhMucController.LayTatCaDanhMuc);

router.post('/:tendanhmuc', DanhMucController.ThemDanhMuc);

router.put('/:iddanhmuc/:tendanhmuc', DanhMucController.SuaDanhMuc);

router.delete('/:iddanhmuc', DanhMucController.XoaDanhMuc);




module.exports = router;
