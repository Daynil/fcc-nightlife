'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compress = require('compression');
require('isomorphic-fetch');
require('dotenv').load();
let production = process.env.NODE_ENV === 'production';

// OAuth login
const session = require('express-session');
const passport = require('passport');
require('./passport')(passport);

// Database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

// Yelp specific
const Yelp = require('yelp');
let yelp = new Yelp({
  consumer_key: process.env.YELP_CONS_KEY,
  consumer_secret: process.env.YELP_CONS_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
});

/** True = get response details on served node modules **/
let verboseLogging = false;

/** Gzip files in production **/
if (production) {
	app.use(compress());
}

app.use(bodyParser.json());

app.use(morgan('dev', {
	skip: (req, res) => {
		if (verboseLogging) return false;
		else return req.baseUrl === '/scripts';
	}
}));

app.use( express.static( path.join(__dirname, '../dist') ));

app.use('/scripts', express.static( path.join(__dirname, '../node_modules') ));
app.use('/app', express.static( path.join(__dirname, '../dist/app') ));

app.use(session({
	secret: 'secretRandSessionPass',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/searchlocation/:location', (req, res) => {
	let location = req.params.location;
	console.log('server location: ', location);
	yelp.search({ term: 'bars', location: location })
		.then( data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect: '/after-auth'}) );

app.get('/auth/checkCreds', (req, res) => {
	console.log('is server authed?', req.isAuthenticated());
	if (req.isAuthenticated()) {
		let userInfo = {
			twitterId: req.user.twitterID
		}
		res.send({loggedIn: true, user: userInfo});
	} else res.send({loggedIn: false, user: null});
});

/*app.get('/auth/logout', (req, res) => {
	req.logout();
	res.end();
});*/

/** Pass all non-api routes to front-end router for handling **/ 
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

let port = process.env.PORT || 3000;
let server = app.listen(port, () => console.log(`Listening on port ${port}...`));