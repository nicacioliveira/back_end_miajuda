var express = require('express');
//autenticator aqui
var usersRoute = express.Router();
var usersCtrl = require('../../controllers/users.ctrl');

usersRoute.post('/login', usersCtrl.login);
usersRoute.get('/', usersCtrl.getUsers);
usersRoute.get('/classes' ,usersCtrl.getMyClasses);
usersRoute.post('/', usersCtrl.addUser);
usersRoute.delete('/:id', usersCtrl.deleteUser);
usersRoute.post('/joinAClass', usersCtrl.joinAClass);

module.exports = usersRoute;