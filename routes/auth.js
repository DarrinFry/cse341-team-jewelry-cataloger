const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google Auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/api-docs');
});

// @desc    Logout user
// @route   POST /auth/logout
router.get('/logout', (req, res, next) => {
    // good idea to use POST or DELETE instead of GET for logging out
    req.logout((err) => {
        if(err) return next(err);
        res.redirect('/');
    });
});

module.exports = router;