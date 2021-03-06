require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./models/index');
const indexRouter = require('./routes/index');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const port = process.env.PORT;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session setting
const options = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60, // 쿠키 유효기간 1시간
  },
  store: new MySQLStore(options)
}));

// Passport setting
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
  if(req.session?.user){
    const { userId, name, major, auth } = req.session.user
    res.locals.user = {
      userId,
      name,
      major,
      auth
    };
  }
  else{
    res.locals.user = {}
  }
  next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

sequelize
  .sync({ alter: false })
  .then(() => console.log('DB 연결 성공!'))
  .catch((err) => {
    console.error(err);
  });

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
