'use strict';

// Dependencies
const User = require('../models/User');
const namedRoutes = require('./namedRoutes');

/**
 * Function for know if user is logged
 * @param req
 * @returns {String|*}
 */
const isLogged = (req) => {
  return !!(req.session.user && req.session.user._id);
};

/**
 * Middleware for private routes
 * @returns {Function}
 */
module.exports = () => {
  return (req, res, next) => {
    // check if user is not logged, then redirect to login
    if(!isLogged(req)){
      return res.redirect(namedRoutes.login);
    }

    // search user and add to req, then continue with next code
    User.findById(req.session.user._id).then(user => {
      req.user = user;
      next();
    });
  };
};

module.exports.isLogged = isLogged;