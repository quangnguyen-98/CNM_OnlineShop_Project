
var express = require('express');
var router = express.Router();
var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {

  let list = [
    {name: 'PHP'},
    {name: 'Ruby'},
    {name: 'Java'},
    {name: 'Python'},
    {name: 'dotNet'},
    {name: 'C#'},
    {name: 'Swift'},
    {name: 'Pascal'},
  ]
  res.render('index', { title: 'Demo Ejs', list: list });
});
module.exports = router;