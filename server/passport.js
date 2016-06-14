'use strict';

let TwitterStrategy = require('passport-twitter').Strategy;
let User = require('./users');

module.exports = (passport) => {
  passport.serializeUser( (user, done) => done(null, user.twitterID));

  passport.deserializeUser( (id, done) => {
    User.findOne({ 'twitterID': id }, (err, user) => done(err, user));
  });

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
  },
    (token, tokenSecret, profile, done) => {
      User.findOne({ 'twitterID': profile.id }, (err, user) => {
        if (err) return done(err);
        if (user) {
          console.log('existing user', user);
          return done(null, user);
        }
        else {
          let newUser = new User();
          newUser.twitterID = profile.id;

          newUser.save( (err) => {
            if (err) throw err;
            console.log('newuser', newUser);
            return done(null, newUser);
          })
        }
      });
    }
  ));

}