'use strict';

// Dependencies
const indexRouter = require('./routes/index');
const apiAdRouter = require('./routes/apiv1/advertisements');
const apiTagRouter = require('./routes/apiv1/tags');
const loginController = require('./routes/loginController');
const namedRoutes = require('./lib/namedRoutes');

class Router {
  constructor(app) {
    // Api
    app.use('/apiv1/advertisements', apiAdRouter);
    app.use('/apiv1/tags', apiTagRouter);
    // Login
    app.get(namedRoutes.login, loginController.index);
    app.post(namedRoutes.login, loginController.post);
    app.get(namedRoutes.logout, loginController.logout);
    app.post(namedRoutes.loginApi, loginController.postApi);
    // Private Routes
    app.use(namedRoutes.home, indexRouter);
  }
}

module.exports = (params) => new Router(params);