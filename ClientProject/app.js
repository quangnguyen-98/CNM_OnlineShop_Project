var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var domain = require('./Config/ServerDomain');
var IndexRouter = require('./routes/Index.route');
var LoginRouter = require('./routes/Login.route');
var AdminRouter = require('./routes/Admin.route');
var SanphamRouter = require('./routes/Sanpham.route');
var BaiVietRouter = require('./routes/BaiViet.route');
var NguoiDungRouter = require('./routes/NguoiDung.route');

var AuthController = require('./controller/Auth.controller');

var app = express();

/* view engine setup default */
/*app.set('views', path.join(__dirname, 'views'));*/
/*app.set('view engine', 'ejs');*/

/* view engine setup ejs-locals */
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*app.engine('html', require('ejs').renderFile);*/
/*app.set('view engine', 'html');*/

//body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/*app.use(function(req, res, next) {
  res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');
  next();
});*/


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', IndexRouter);
app.use('/Login', LoginRouter);
app.use('/Admin', AuthController.KiemTraToken, AdminRouter);
app.use('/SanPhams', SanphamRouter);
app.use('/BaiViets', BaiVietRouter);
app.use('/NguoiDungs',NguoiDungRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.locals.domain = domain;
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.domain = domain;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.soTrangLocal = 100;
module.exports = app;

