const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
// LOAD USER MODEL
const User = mongoose.model('users');

module.exports = function(passport){
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret:keys.googleClientSecret,
      callbackURL:'/auth/google/callback',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
      // console.log(profile);

      const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
      
      //THIS OBJECT WILL CONTAIN THE DATAT THAT WILL BE ADDED TO DB
      const newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      }

      // CHECK FOR EXISTING USER . IF THERE IS A USER WITH SAME ID WE DO NOT WANT A DUPLICATE ENTRY IN DB
      User.findOne({
        googleID: profile.id
      }).then(user => {
        if(user){
          // RETURN USER
          done(null, user);
        } else {
          // CREATE USER
          new User(newUser)
            .save()
            .then(user => done(null, user));
        }
      })
    })
  )
}