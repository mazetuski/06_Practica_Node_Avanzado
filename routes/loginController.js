"use strict";

// Dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const namedRoutes = require('../lib/namedRoutes');
const sessionAuth = require('../lib/sessionAuth');

class LoginController {

  // GET /login
  index(req, res, next){
    const isLogged = sessionAuth.isLogged(req);
    // check if is logged, then redirect to home
    if(isLogged){
      return res.redirect(namedRoutes.home);
    }
    //render login
    res.render('login', {
      email: '',
      error: ''
    });
  }

  // POST /login
  async post(req, res, next) {
    try {
      // get user from request and check password
      const user = await sessionAuth.getUserFromRequestLogged(req);
      // if no user then render login
      if (!user) {
        res.render('login', {
          'email': req.body.email,
          'error': res.__('Invalid Credentials')
        });
        return;
      }
      // add id to session for get user logged
      req.session.user = {_id: user.id};
      res.redirect(namedRoutes.home);
    }catch (err) {
      next(err);
    }
  }

  // POST /apiv1/login
  async postApi(req, res, next) {
    try {
      // get user from request and check password
      const user = await sessionAuth.getUserFromRequestLogged(req);

      // if no user then return an error
      if (!user) {
        res.json({'success': false, 'error': res.__('Invalid credentials')});
        return;
      }

      // get jwt token from this user
      jwt.sign({_id: user.id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
      }, (err, token) => {
        // check if error exists
        if (err) {
          next(err);
          return;
        }
        // return token with a success response
        res.json({'success': true, token: token});
      })
    } catch (err) {
      next(err);
    }
  }

  // GET /logout
  logout(req, res, next){
    // destroy session and regenerate it without authentication
    delete req.session.user;
    req.session.regenerate(function (err) {
      if(err){
        next(err);
        return;
      }
      res.redirect(namedRoutes.login);
    })
  }
}

module.exports = new LoginController();