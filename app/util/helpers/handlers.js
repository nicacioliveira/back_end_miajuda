const authenticator = require('../security/authenticator');
const Users = require('../../db/models/users.mdl');
const Classes = require('../../db/models/classes.mdl');
const Rest = require('../services/rest');

function getUserOfHeaderAuthJWT(req, res) {
    var jwt = req.headers['authorization'];
    if (!jwt) {
        Rest.authenticationRequired(res, true);
    }

    var authDecoded = authenticator.decodeJWT(jwt);

    var user = Users.findOne({_id: authDecoded.id}, (err, user) => {
        if (err) {
            Rest.somethingWentWrong(res, err);
        }
        
        if (!user)
            Rest.userNotFound(res, true);

    });

    return user;
}

function getClassById(req, res) {
    if (!req.body.classId)
        Rest.idIsRequired(res, true);

    var cl = Classes.findOne({_id: req.body.classId}, (err, user) => {
        if (err) 
            Rest.somethingWentWrong(res, err);
        
        if (!user)
            Rest.classNotFound(res, true);

    });

    return cl;
}

module.exports = {
    getUserOfHeaderAuthJWT: getUserOfHeaderAuthJWT,
    getClassById: getClassById
}