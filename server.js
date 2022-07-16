const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const swaggerAutogen = require('swagger-autogen');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./db/connect');

// Passport config
require('./config/passport')(passport);

// Connect the database
connectDB();

const port = process.env.PORT || 8080;
const app = express();

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URI }),
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }
}));

// Passport middleware
app
  .use(passport.initialize())
  .use(passport.session());

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// App
app
	.use(bodyParser.json())
	.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Origin, E-Requested-With, Content-Type, Accept, Z-Key'
		);
		// Need to comment out below to make ejs template work
		// res.setHeader('Content-Type', 'application/json');
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, PUT, DELETE, OPTIONS'
		);
		next();
	})
	.use('/', require('./routes'));

// Handle any uncaught exceptions
process.on('uncaughtException', (err, origin) => {
	console.log(process.stderr.fd, `Exception: ${err}\n` + `Origin: ${origin}`);
});

// Start app
app.listen(port, console.log(`Server running on port ${port}`));
