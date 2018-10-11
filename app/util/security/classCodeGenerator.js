const credentialedUsersToGenerateToken = ["professor", "monitor"];
const credentialedUsersToUseToken = ["aluno"];
const Rest = require('../services/rest');
const DEFAULT_TOKEN_LENGHT = 5;
const Classes =  require('../../db/models/classes.mdl')

function createStringCode(length) {
    var code = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
    code += possible.charAt(Math.floor(Math.random() * possible.length));

    return code;
};

async function genUniqueCode() {
    var unique = false;
    var code = createStringCode(DEFAULT_TOKEN_LENGHT);

    while (!unique) {
        var existingCode = await Classes.findOne({code: code});
        if (existingCode) {
            code = createStringCode(DEFAULT_TOKEN_LENGHT);
        } else {
            unique = true;
        }
    }
    return code;
}


module.exports = {
    genUniqueCode: genUniqueCode
}