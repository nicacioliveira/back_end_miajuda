const Tokens = require('../../db/models/tokens.mdl');
const credentialedUsersToGenerateToken = ["professor", "monitor"];
const credentialedUsersToUseToken = ["aluno"];
const Rest = require('../services/rest');
const DEFAULT_TOKEN_LENGHT = 5;

function createTokenString(length) {
    var tokenString = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        tokenString += possible.charAt(Math.floor(Math.random() * possible.length));
    return tokenString;
};

async function generateToken(req, res) {

    if (credentialedUsersToGenerateToken.indexOf(req.body.user.role) === -1) {
        Rest.json(res, 401, {err: 'Você não tem tem altorização para criar tokens.'});
    }

    var unique = false;
    var token = createTokenString(DEFAULT_TOKEN_LENGHT);


    while (!unique) {
        var existingToken = await Tokens.findOne({token: token});

        if (existingToken) {
            token = createTokenString(DEFAULT_TOKEN_LENGHT);
        } else {
            unique = true;
        }
    }

    var newToken = {
        token: token,
        role: req.body.user.role,
        class_id: req.body.class._id,
        created_by: req.body.user._id
    }
    
    Tokens.create(newToken).then((respToken) => {
        Rest.json(res, 200, {token: respToken.token, message: 'Token criado com sucesso!'});
    }).catch((err) => {
        Rest.json(res, 500, {log: err, msg: "Não foi possível criar o token."});
    });
};

function checkToken(token) {
    var date = new Date();
    if(date > token.expiration_date)
        return {err: true, code: 500, msg: "Token expirado"};
        
    
    if (token.token.length !== DEFAULT_TOKEN_LENGHT)
        return {err: true, code: 500, msg: "Token inválido"};

    return {err: false}
};

module.exports = {
    generateToken: generateToken,
    checkToken: checkToken
}