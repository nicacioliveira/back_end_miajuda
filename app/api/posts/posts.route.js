var express = require('express');
var postsRoute = express.Router();
var postsCtrl = require('./posts.ctrl');

postsRoute.post('/', postsCtrl.addPost);
postsRoute.get('/', postsCtrl.getPosts);
postsRoute.put('/', postsCtrl.updatePost);
postsRoute.delete('/:id', postsCtrl.deletePost);


module.exports = postsRoute;