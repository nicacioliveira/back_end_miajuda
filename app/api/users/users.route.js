var express = require('express');
//autenticator aqui
var usersRoute = express.Router();
var usersCtrl = require('./users.ctrl');

usersRoute.post('/login', usersCtrl.login);
usersRoute.get('/', usersCtrl.getUsers);
usersRoute.get('/classes' ,usersCtrl.getMyClasses);
usersRoute.get('/posts' ,usersCtrl.getMyPosts);
usersRoute.post('/', usersCtrl.addUser);
usersRoute.delete('/:id', usersCtrl.deleteUser);
usersRoute.post('/joinAClass', usersCtrl.joinAClass);
usersRoute.put('/', usersCtrl.updateUser);
usersRoute.delete('/quitClass/:classId', usersCtrl.quitFromClass);

module.exports = usersRoute;