const authenticator = require('../security/authenticator');
const Users = require('../../db/models/users.mdl');
const Rest = require('../services/rest');

function getUserOfHeaderAuthJWT(req, res) {
    var jwt = req.headers['authorization'];
    if (!jwt) {
        Rest.json(res, 404, "Autenticação requerida!");
    }

    var authDecoded = authenticator.decodeJWT(jwt);

    var user = Users.findOne({_id: authDecoded.id}, (err, user) => {
        if (err) 
            Rest.json(res, 404, {err: err, log: "Algo deu errado"})
        
        if (!user)
            Rest.json(res, 404, {err: null, log: "Usuário não encontrado"});

    });

    return user;
}


module.exports = {
    getUserOfHeaderAuthJWT: getUserOfHeaderAuthJWT
}