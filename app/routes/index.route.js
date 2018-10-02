var express = require('express');

var users = require('./api/users.route');
var auth = require('./api/auth.route');
var classes = require('./api/classes.route');
var rootRouter = express.Router();

rootRouter.use('/users', users);
rootRouter.use('/auth', auth);
rootRouter.use('/classes', classes);

module.exports = rootRouter;