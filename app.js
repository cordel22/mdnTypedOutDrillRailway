var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

var app = express();

var mongoose = require('mongoose');
//	this is the database not populated automatically yet
/*
var mongoDB = 'mongodb+srv://cordel22:dopici123@cluster0.ioypxqt.mongodb.net/?retryWrites=true&w=majority
';
*/
//	this is the database from the original design, leaving the new drill version empty for later..? 
//  var mongoDB = 'mongodb+srv://cordel22:dopici123@cluster-0.nj9uh.mongodb.net/?retryWrites=true&w=majority';
//  railway
const dev_db_url = 'mongodb+srv://cordel22:dopici123@cluster-0.nj9uh.mongodb.net/?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
//  railway end

// mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//  railway
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
//  railway end

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

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
