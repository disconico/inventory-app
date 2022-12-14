require('dotenv').config({ path: './config.env' });

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = process.env.PORT || '8000';
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const materialsRouter = require('./routes/materials');
const categoriesRouter = require('./routes/categories');
const homeRouter = require('./routes/home');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression()); // Compress all routes
app.use(helmet());

// Set up mongoose connection
const mongoDB = process.env.ATLAS_URI;

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/materials', materialsRouter);
app.use('/categories', categoriesRouter);
app.use('/home', homeRouter);

app.listen(port, () => {
	// perform a database connection when server starts
	mongoose.connect(mongoDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'MongoDB connection error:'));
	db.on('open', function () {
		console.log('Successfully connected to MongoDB.');
	});

	//Say hi
	console.log(`Server is running on port: ${port}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// Log the error page
	console.log(`Error ${err.status} - ${err.message}` || 500);
});

module.exports = app;
