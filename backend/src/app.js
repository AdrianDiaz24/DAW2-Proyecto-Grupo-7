/**
 * @file Fichero principal de la aplicación Express.
 * @description Configura y arranca el servidor Express, define middlewares y rutas.
 * @requires http-errors
 * @requires express
 * @requires path
 * @requires cookie-parser
 * @requires morgan
 * @requires cors
 * @requires helmet
 * @requires observability.service - Servicio de monitoreo y logging
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
const { metricsMiddleware, getMetrics } = require('./services/observability.service');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(helmet());
app.use(metricsMiddleware);

/**
 * @name CORS_Configuration
 * @description Configuración de CORS para permitir peticiones desde el frontend.
 * @property {string} origin - El origen permitido para las peticiones.
 * @property {boolean} credentials - Indica si se permiten credenciales.
 * @property {number} optionsSuccessStatus - Código de estado para peticiones OPTIONS.
 */
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
const formularioRouter = require('./routes/formulario.routes');
const registroRouter = require('./routes/registro.routes');
const diarioRouter = require('./routes/diario.routes');
const iaRoutes = require('./routes/ia.routes');
const contactoEmergenciaRouter = require('./routes/contactoEmergencia.routes');
const healthRouter = require('./routes/health.routes');

app.use('/api/auth', authRouter);
app.use('/api/formulario', formularioRouter);
app.use('/api/registro', registroRouter);
app.use('/api/registros', registroRouter); // Añadido para aceptar la forma plural
app.use('/api/diario', diarioRouter);
app.use('/api/health', healthRouter);
app.use('/api', iaRoutes);
app.use('/api/contactos-emergencia', contactoEmergenciaRouter);

/**
 * @name GET_/api/metrics
 * @description Endpoint para obtener métricas en formato Prometheus
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
app.get('/api/metrics', async (req, res) => {
  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.send(await getMetrics());
});

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

/**
 * @name GET_/
 * @description Ruta de prueba para comprobar que el servidor funciona.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
app.get('/', (req, res) => {
    res.send('Funciona')
})


/**
 * @name 404_Error_Handler
 * @description Middleware para capturar errores 404 (Not Found).
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * @name Generic_Error_Handler
 * @description Middleware para gestionar todos los demás errores.
 * @param {object} err - Objeto de error.
 * @param {object} req - Objeto de petición de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
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
