var express = require('express');

var users = require('./api/users/users.route');
var classes = require('./api/classes/classes.route');
const swaggerDoc = require('./util/constants/swagger');
var rootRouter = express.Router();

rootRouter.use('/users', users);
rootRouter.use('/classes', classes);
rootRouter.use('/docs', swaggerDoc());

module.exports = rootRouter;