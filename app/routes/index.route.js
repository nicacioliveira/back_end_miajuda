var express = require('express');

var users = require('./api/users.route');
var classes = require('./api/classes.route');
var rootRouter = express.Router();

rootRouter.use('/users', users);
rootRouter.use('/classes', classes);

module.exports = rootRouter;