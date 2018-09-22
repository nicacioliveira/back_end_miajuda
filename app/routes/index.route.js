var express = require('express');

var users = require('./api/users.route');
var auth = require('./api/auth.route');

var rootRouter = express.Router();

rootRouter.use('/users', users);
rootRouter.use('/auth', auth);

module.exports = rootRouter;