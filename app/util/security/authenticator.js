var jwt = require('jsonwebtoken');
var Config = require('../constants/config');
var Time = require('../helpers/time');

const EXPIRATION_TIME = Time.transformUnit('week', 'second', 1);

function generateJWT(user) {
    return jwt.sign(
        {id : user._id},
        Config.APP_SECRET,
        {expiresIn: EXPIRATION_TIME}
    )
}

module.exports = {
    generateJWT : generateJWT
};