var bcrypt = require('bcryptjs');
var Users = require('../db/models/users.mdl');
var Config = require('../util/constants/config');
var Authenticator = require('../util/security/authenticator');
var Rest = require('../util/services/rest');

async function login(req, res) {

    Users.findOne({email : req.body.email}, (err, user) => {
        if (!user){
            var userDefault = {
                name: "account01",
                email: req.body.email,
                password: "123",
                role: "aluno"
            };
            Users.create(userDefault)
                .then(() => {   var token2 = Authenticator.generateJWT(userDefault)
                                return Rest.json(res,200,{userDefault:{ name : userDefault.name, email: userDefault.email, role: userDefault.role}, jwt: token2});
                            })

        }else if (!bcrypt.compareSync(req.body.password, user.password)) {
            return Rest.json(res, 401, {err: 'Wrong password'});

        }else {
            var token = Authenticator.generateJWT(user);
            return Rest.json(res, 200, {user: {name: user.name, email: user.email, role: user.role}, jwt: token});
        }
    })
}


module.exports = {
    login: login,
};