var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

var userResultArray = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/favicon.ico', express.static('images/favicon.ico'))

app.use('/', indexRouter);

// receiving string with user results from client
app.post('/', function(req, res) {
	// Calling for "add Result to csv" function
	addToResultsFile(req.body.userResStr);
	res.status(200).send(req.body.userResStr);
});

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
  res.json({
	  message: err.message,
	  error: err
	});
});

module.exports = app;

var fs = require('fs');

function onRequest(request, response){
	response.writeHead(200,{'Content-Type': 'text/html'});
	fs.readFile('./JProject.html', null, function(error, data){
		if (error) {
			response.writeHead(404);
			response.write('File not found');
		}else{
			response.write(data);
		}
		response.end();
	});
}

//Adding Result to csv file
function addToResultsFile(userResStr){
	userResStr = userResStr.concat("\r\n");
	console.log("Im in addToResultsFile. userResStr is " + userResStr);
	
	fs.appendFile('Results.csv', userResStr, function (err) {
	  if (err) throw err;
	  console.log('Saved!');
	});
	

}