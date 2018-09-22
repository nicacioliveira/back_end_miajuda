var bcrypt = require('bcrypt');
var Users = require('../db/models/users.mdl');
var Config = require('../util/constants/config');
var Authenticator = require('../util/security/authenticator');
var Rest = require('../util/services/rest');

async function login(req, res) {
    Users.findOne({email : req.body.email}, (err, user) => {
        if (!user)
            return Rest.json(res, 404, {err : 'No such user'});
        if (!bcrypt.compareSync(req.body.password, user.password))
            return Rest.json(res, 401, {err : 'Wrong password'})

        var token = Authenticator.generateJWT(user);

        Rest.json(res, 200, {user:{ name : user.name, email: user.email, role: user.role}, jwt: token});
    })
}



module.exports = {
    login: login
};