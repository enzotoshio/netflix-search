/**
 * Movies.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    show_title: {
      type: 'string',
      required: true
    },
    release_year: {
      type: 'string',
      required: true
    },
    rating: {
      type: 'string',
      required: true
    },
    category: {
      type: 'string',
      required: true
    },
    show_cast: {
      type: 'string',
      required: true
    },
    director: {
      type: 'string',
      required: true
    },
    summary: {
      type: 'string',
      required: true
    },
    poster: {
      type: 'string',
      required: true
    },
    mediatype: {
      type: 'string',
      required: true
    },
    runtime: {
      type: 'string',
      required: true
    }
  }
};

