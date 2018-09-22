var express = require('express');
var authenticator = require('../../util/security/authenticator');
var authRouter = express.Router();
var authController = require('../../controllers/auth.ctrl');

authRouter.post('/login', authController.login);

module.exports = authRouter;