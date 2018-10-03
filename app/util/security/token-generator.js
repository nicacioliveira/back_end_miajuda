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
        Rest.json(res, 401, {err: 'This user is not authorized to create tokens'});
    }

    Tokens.findOne(req.body.token, (err, token) => {
        if (!err) {
            Rest.json(res, 200, {token: token.token, message: 'Token already exists'});
        } else {
            var newToken = createTokenString(5);
            var newToken = {
                token: newToken,
                role: req.body.user.role,
                class_id: req.body.class._id,
                created_by: req.body.user._id
            }
            Tokens.create(newToken).then((respToken) => {
                Rest.json(res, 200, {token: respToken.token, message: 'Token created successfully'});
            }).catch((err) => {
                Rest.json(res, 500, {err: err});
            });
        }
    });

};

function checkToken(token) {
    var date = new Date();
    if(date < token.expiration_date ){
        return token;
    }else{
       return -1;
    }
};

module.exports = {
    generateToken: generateToken,
    checkToken: checkToken
}