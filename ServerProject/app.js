var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

//Khai báo short-id
var ids = require('short-id');
ids.configure({
  length: 10,          // The length of the id strings to generate
  algorithm: 'sha1',  // The hashing algoritm to use in generating keys
  salt: Math.random   // A salt value or function
});

//Khai báo router
var IndexRouter = require('./routes/Index.route');
var NguoiDungRouter = require('./routes/NguoiDung.route');
var SanPhamRouter = require('./routes/SanPham.route');
var CarouselRouter = require('./routes/Carousel.route');
var FooterlRouter = require('./routes/Footer.route');
var app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  /*res.header("Access-Control-Allow-Origin", "http://localhost:3004");*/
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/', IndexRouter);
app.use('/api/NguoiDungs', NguoiDungRouter);
app.use('/api/Sanphams', SanPhamRouter);
app.use('/api/Carousels',CarouselRouter);
app.use('/api/Footers',FooterlRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
