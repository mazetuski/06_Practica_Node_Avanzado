"use strict";

// Dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

class LoginController {
  // POST /login
  postApi(req, res, next){
    // get email and password
    const email = req.body.email;
    const password = req.body.password;

    // get user from database with this email
    const user = User.findOne({ email: email});

    // check user exists and password is valid
    if(!user || !bcrypt.compare(password, user.password)){
      res.json({'success': false, error: res.__('Invalid credentials')});
    }
    // TODO: POR AQUI
    jwt.sign()
  }
}

module.exports = new LoginController();