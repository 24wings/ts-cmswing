import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import session = require('express-session');
import pug = require('pug');
import moment = require('moment');
moment.locale('zh-cn');

import {
  indexRouter,
  signupRouter,
  adminRouter,
  userRouter,
  signinRouter
} from './routes/index';



var app = express();
// 按照上面的解释，设置 session 的可选参数
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 1000 }
}));
// view engine setup
app.set('views', path.resolve(__dirname, '../src/views/'));
app.set('view engine', 'pug');

// 开发者模式
app.disable('view cache');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));
/**
 * 没有缓存
 */

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache');
  next();
});

/**
 * 记录session状态
 */
app.use(function (req, res, next) {
  res.locals.user = req.session.user || null;
  res.locals.path = req.path;
  res.locals.moment = moment;
  // 暂时将标签页分类写死
  res.locals.tables = ['问答', '分享', '吐槽', '招聘'];
  next();
});


app.use('/', indexRouter);

app.use('/signup', signupRouter);

app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/signin', signinRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
