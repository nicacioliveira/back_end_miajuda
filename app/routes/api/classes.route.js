var express = require('express');
var authenticator = require('../../util/security/authenticator');
var classRouter = express.Router();
var classController = require('../../controllers/classes.ctrl');

classRouter.get('/', classController.getClasses);
classRouter.post('/', classController.addClass);
classRouter.delete('/:id', classController.deleteClass);

module.exports = classRouter;