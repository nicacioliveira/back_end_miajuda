var express = require('express');
//autenticator aqui
var usersRoute = express.Router();
var usersCtrl = require('../../controllers/users.ctrl');


usersRoute.get('/', usersCtrl.getUsers);
usersRoute.post('/', usersCtrl.addUser);
usersRoute.delete('/:id', usersCtrl.deleteUser);
usersRoute.post('/generateToken', usersCtrl.generateToken);
usersRoute.post('/joinAClass', usersCtrl.joinAClass);

module.exports = usersRoute;