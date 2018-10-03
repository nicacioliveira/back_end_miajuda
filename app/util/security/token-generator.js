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

    var unique = false;
    var token = createTokenString(5);


    while (!unique) {
        var existingToken = await Tokens.findOne({token: token});

        if (existingToken) {
            token = createTokenString(5);
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
        Rest.json(res, 200, {token: respToken.token, message: 'Token created successfully'});
    }).catch((err) => {
        Rest.json(res, 500, {err: err});
    });
};

function checkToken(req, res) {
    var token = {
        token: req.body.token,
        created_by: req.body.created_by,
        class_id : req.body.class_id,
        expiration_date: req.body.expiration_date,
        role: req.body.role
    };

    var date = new Date();
    if(date < token.expiration_date ){
        return token.class_id;
    }else{
        Rest.json(res, 500, "Date expired");
    }
};

module.exports = {
    generateToken: generateToken,
    checkToken: checkToken
}