var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy ({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true},
  function(req, email, password, done) {
  User.findOne({'email': email}, function(err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      if (user.password === password) {
        return done(null, user);
      }
      return done(null, false, {passwordWrong: true, message: 'Password is wrong'});
    }
    var newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.save(function(err, result) {
      if (err) {
        return done(err);
      }
      return done(null, newUser);
    });
  })
}));
