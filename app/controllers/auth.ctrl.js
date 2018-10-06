var bcrypt = require('bcryptjs');
var Users = require('../db/models/users.mdl');
var Config = require('../util/constants/config');
var Authenticator = require('../util/security/authenticator');
var Rest = require('../util/services/rest');

async function login(req, res) {
    try {
        Users.findOne({ email: req.body.email }, (err, user) => {
            if (!user) {
                var hashedPassword = bcrypt.hashSync(req.body.password, 8);
                var userDefault = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    role: "aluno"
                };
                Users.create(userDefault)
                    .then(() => {
                        var token2 = Authenticator.generateJWT(userDefault)
                        return Rest.json(res, 200, { userDefault: { name: userDefault.name, email: userDefault.email, role: userDefault.role }, jwt: token2 });
                    })

            } else if (!bcrypt.compareSync(req.body.password, user.password)) {
                return Rest.json(res, 401, { err: 'Senha incorreta!' });

            } else {
                var token = Authenticator.generateJWT(user);
                return Rest.json(res, 200, { user: { name: user.name, email: user.email, role: user.role }, jwt: token });
            }
        })
    } catch (err) {
        Rest.serverError(res, { log: err, msg: "Problema interno no servidor." });
    }
}

async function verifyJwtToken(req, res, next) {
    try {
        var token = req.headers['authorization'];
        if (!token)
            return Rest.json(res, 401, { err: 'Token inexistente.' });

        jwt.verify(token, Config.APP_SECRET, function (err, decoded) {
            if (err)
                return Rest.json(res, 401, { err: 'Falha na autenticação.' });

            var expirationDate = new Date(decoded.exp * 1000);

            if (new Date() > expirationDate) {
                return Rest.json(res, 401, { err: 'Token expirado.' });
            }

            var userId = decoded.id;

            User.findOne({ _id: userId }, function (err, user) {
                req.user = user;
                next();
            });
        });
    } catch (err) {
        Rest.serverError(res, { log: err, msg: "Problema interno no servidor." });
    }
}

module.exports = {
    login: login,
    verifyJwtToken: verifyJwtToken
};