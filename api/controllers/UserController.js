/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('sails/node_modules/lodash');

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

  create: function(req, res) {
    var Model = actionUtil.parseModel(req);
    var data = actionUtil.parseValues(req);

    Model.create(data).exec(function created(err, newInstance) {
      if (err) return res.negotiate(err);

      if (req._sails.hooks.pubsub) {
        if (req.isSocket) {
          Model.subscribe(req, newInstance);
          Model.introduce(newInstance);
        }

        var publishData = _.isArray(newInstance) ?
          _.map(newInstance, function(instance) {
            return instance.toJSON();
          }) :
          newInstance.toJSON();
        Model.publishCreate(publishData, !req.options.mirror && req);
      }

      res.redirect('/');
    });
  },

  postLike: function(req, res) {
    User.findOne({
      email: req.user.email
    }).exec(function(err, user) {
      if (err) {
        return res.negotiate(err);
      }


      for (var i = 0; i < user.likes.length; i++) {
        if (user.likes[i].show_id == req.body.like.show_id) {
          console.log(user.likes[i]);
          return;
        } else {
          console.log('novo', user.likes[i]);
        }
      }

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
  },

  deleteLike: function(req, res) {
    User.native(function(err, collection) {
      if (err) return res.serverError(err);
      collection.update({
        email: req.user.email
      }, {
        $pull: {
          likes: {
            show_id: req.body.like.show_id
          }
        }
      });
    });
  }
};