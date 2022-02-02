'use strict';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import endpoints from './routes/endpoints';
import swaggerDoc from './components/swagger/controller';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { wsSubcription } from './components/mutants/utils/api-graphql';
const createError = require('http-errors');

const app = express();
app.use( cors() );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// pendiente de actualizaciones
wsSubcription();
// app.use('/', indexRouter);
endpoints(app);
swaggerDoc(app);

// Seguridad
app.use( helmet() );
app.use( compression() );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('404: Not Found');   //this line :)
    err.status = 404;
    next(err);
});

// error handler
app.use( function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
} );

// export default app;
module.exports = app;