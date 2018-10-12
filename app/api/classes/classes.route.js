var express = require('express');
var authenticator = require('../../util/security/authenticator');
var classRouter = express.Router();
var classController = require('./classes.ctrl');

classRouter.get('/', classController.getClasses);
classRouter.post('/', classController.addClass);
classRouter.delete('/:id', classController.deleteClass);
classRouter.put('/', classController.updateClass);
classRouter.delete('/student/:classId', classController.removeStudentFromClass);

module.exports = classRouter;