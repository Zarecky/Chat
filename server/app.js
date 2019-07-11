const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


//Import middleware
const auth = require('./middleware/auth').http;
const loadUser = require('./middleware/loadUser').http;

//Import routes
const authRouter = require('./routes/auth');
const protectedRouter = require('./routes/protected');

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/getUser', auth, loadUser, (req, res) => {
  console.log(req.user);
  res.send({
    name: req.user.name
  });
});

//Routes
app.use('/api/protected', protectedRouter);

app.use('/api', authRouter);

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
  console.error(err);
  res.status(err.status || 500);
  res.end();
});

module.exports = app;
