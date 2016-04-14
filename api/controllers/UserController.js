/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home: function(req, res) {
    res.view('homepage');
  },

  getLikes: function(req, res) {
    User.findOne({
      email: req.user.email
    }).exec(function(err, user) {
      if (err) {
        return res.negotiate(err);
      }
      sails.log('Wow, there are users.  Check it out:', user.likes);
      console.log(user);
      return res.json(user.likes);
    });
  },

  postLike: function(req, res) {
    User.findOne({
      email: req.user.email
    }).exec(function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      user.likes.each(function(item, list){
        if (item.show_id == req.body.like.show_id) {
          return;
        }
      });

      User.native(function(err, collection) {
        if (err) return res.serverError(err);
        collection.update({
          email: req.user.email
        }, {
          $push: {
            likes: req.body.like
          }
        });
      });
    });
  }
};