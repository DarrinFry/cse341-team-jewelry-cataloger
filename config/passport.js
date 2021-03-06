const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/Auth_User');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://cse-341-team-jewelry-cataloger.herokuapp.com/auth/google/callback'
        // change callbackURL to /auth/google/callback for local testing
        // change callbackURL to https://cse-341-team-jewelry-cataloger.herokuapp.com/auth/google/callback for heroku deployment
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile.emails[0].value);
        const newUser = {
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
        }

        try {
            let user = await User.findOne({ googleId: profile.id });
            if(user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.error(err);
        }
    }));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}