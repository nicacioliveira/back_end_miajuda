const Users = require('../db/models/users.mdl');
const Classes = require('../db/models/classes.mdl');
const Rest = require('../util/services/rest');
const Tokens = require('../db/models/tokens.mdl');
const bcrypt = require('bcryptjs');
const Time = require('../util/helpers/time');
const TokenGenerator = require("../util/security/token-generator");

async function getUsers(req, res, next) {
    try {
        var users = [];
        var dbUsers = await Users.find();

        for (var u of dbUsers) {
            users.push(u);
        }
        Rest.json(res, 200, users);
    } catch (err) {
        Rest.serverError(res, { log: err, msg: "Problema interno no servidor." });
    }
}

async function addUser(req, res) {
    try {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        var usr = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        };

        Users.create(usr).then((user) => {
            Rest.json(res, 200, { user: user });
        }).catch((err) => {
            Rest.json(res, 500, { err: err });
        });
    } catch (err) {
        Rest.serverError(res, { log: err, msg: "Problema interno no servidor." });
    }
}

async function deleteUser(req, res) {
    try {
        Users.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                Rest.json(res, 404, { err: err });
            } else {
                Rest.json(res, 200, "Usuário removido.");
            }
        });
    } catch (err) {
        Rest.serverError(res, { log: err, msg: "Problema interno no servidor." });
    }
}

async function generateToken(req, res) {
    try {
        TokenGenerator.generateToken(req, res);
    } catch (err) {
        Rest.serverError(res, { log: err, msg: "Problema interno no servidor." });
    }
};

async function joinAClass(req, res) {
    try {
        await Tokens.findOne({ token: req.body.token })
            .then((tokenObj) => {
                //verify token
                var checkToken = TokenGenerator.checkToken(tokenObj);
                if (checkToken.err)
                    Rest.json(res, 500, checkToken.err);

                //verify user id
                Users.findOne({ _id: req.body.user_id }).then((user) => {
                    if (!user) {
                        Rest.json(res, 500, "Usuário não existe");
                    } else {
                        //update class
                        Classes.findOneAndUpdate(
                            { _id: tokenObj.class_id },
                            { $push: { students: user.email } },
                            { new: true },
                            (err, Class) => {
                                if (err)
                                    Rest.json(res, 500, "Algo deu errado");
                                else
                                    Rest.json(res, 200, Class);
                            });
                    }
                }).catch();
            })
            .catch((err) => {
                Rest.json(res, 500, "Token não existe");
            });
    } catch (err) {
        Rest.serverError(res, { log: err, msg: "Problema interno no servidor." });
    }
}

async function getMyClasses(req, res) {
    try {
        Users.findOne({ email: req.query.email }).then((user) => {

            if (!user) {
                Rest.json(res, 500, "Usuário não existe");
            } else {

                var resp = [];
                Classes.find({}, (err, cls) => {
                    if (err)
                        Rest.json(res, 500, "Algo deu errado");
                    else {
                        cls.map(c => {
                            if (c.students.indexOf(req.body.email) !== -1) resp.push(c);
                        });
                        Rest.json(res, 200, resp);
                    }
                });
            }
        })
            .catch((err) => {
                Rest.json(res, 500, "Usuário não existe");
            })
    } catch (err) {
        Rest.json(res, 500, { err: err, msg: "Problema interno no servidor." });
    }
}

module.exports = {
    getUsers: getUsers,
    addUser: addUser,
    deleteUser: deleteUser,
    generateToken: generateToken,
    joinAClass: joinAClass,
    getMyClasses: getMyClasses
};