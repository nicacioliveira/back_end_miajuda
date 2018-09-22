var express = require('express');
//autenticator aqui
var usersRoute = express.Router();
var usersCtrl = require('../../controllers/users.ctrl');


usersRoute.get('/', usersCtrl.getUsers);
usersRoute.post('/', usersCtrl.addUser);

module.exports = usersRoute;