/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {
  middleware: {

    passportInit: require('passport').initialize(),
    passportSession: require('passport').session(),

    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'passportInit',
      'passportSession',
      'myRequestLogger',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],
  }
};