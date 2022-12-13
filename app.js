// noinspection JSUnresolvedVariable

const createError = require('http-errors');
const express = require('express');
const session = require('express-session')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
// const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const dbRouter = require('./routes/db_api');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const skillsRouter = require('./routes/skills');
const projectsRouter = require('./routes/projects');
const positionsRouter = require('./routes/positions');
const departmentsRouter = require('./routes/departments');
const systemRolesRouter = require('./routes/system_roles');
const projectRolesRouter = require('./routes/project_roles');
const {passport, isLoggedIn} = require('./oauth-passport')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let corsOptions = {
  origin: "*",
  headers: "Content-Type",
  methods: "PATCH,PUT,DELETE",
  credentials: true
}

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize({}));
app.use(passport.session({}));


// let config = {cors: corsOptions}
app.options('*', (req,res, next)=> {
  console.log('options')
  next()
}, cors(corsOptions));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS")
  // console.log("set")
  next();
});
app.use('/', indexRouter);
app.use('/auth', authRouter());
// app.use('/db_api', isLoggedIn);
app.use('/db_api/users', usersRouter());
app.use('/db_api/skills', skillsRouter());
app.use('/db_api/projects', projectsRouter());
app.use('/db_api/positions', positionsRouter());
app.use('/db_api/departments', departmentsRouter());
app.use('/db_api/system_roles', systemRolesRouter());
app.use('/db_api/project_roles', projectRolesRouter());
app.use('/db_api', dbRouter());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
