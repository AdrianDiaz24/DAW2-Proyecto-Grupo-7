var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(helmet());

// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Puerto típico de React cuando backend usa 3000
    credentials: true, // Permitir envío de cookies y headers de autenticación
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const authRouter = require('./routes/auth.routes');

app.use('/api/auth', authRouter);

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Funciona')
})


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
