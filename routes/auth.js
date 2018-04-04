//AUTH ROUTES
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

//NEW SEC ADDED 04/04
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
  });
  //

module.exports = router;
