var express = require('express');
var authenticator = require('../../util/security/authenticator');
var classRouter = express.Router();
var classController = require('./classes.ctrl');

classRouter.get('/', classController.getClasses);
classRouter.post('/', classController.addClass);
classRouter.get("/posts/:classId", classController.getPosts);
classRouter.delete('/:id', classController.deleteClass);
classRouter.put('/', classController.updateClass);
classRouter.delete('/student/:classId', classController.removeStudentFromClass);
classRouter.get('/monitors/:classId', classController.getMonitors);

module.exports = classRouter;