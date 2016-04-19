/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  login: function(req, res) {

    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return res.send({
          message: info.message,
          user: user
        });
      } else if (!user) {
        res.view('login', {
          error: 'User or password wrong.'
        });
      } else {
        req.logIn(user, function(err) {
          if (err) res.send(err);
          res.redirect('/#/home');
        });
      }

    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  }
};