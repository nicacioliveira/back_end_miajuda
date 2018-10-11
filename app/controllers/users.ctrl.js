const Users = require('../db/models/users.mdl');
const Classes = require('../db/models/classes.mdl');
const Rest = require('../util/services/rest');
const bcrypt = require('bcryptjs');
const Time = require('../util/helpers/time');
const Handlers = require('../util/helpers/handlers');

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

async function joinAClass(req, res) {
    try {
        var user = await Handlers.getUserOfHeaderAuthJWT(req, res);

        if (!req.body.code)
            Rest.json(res, 404, {err: true, log: "Código vazio!"})
        
        var alreadyRegistered = await Classes.find({code: req.body.code, students: [user._id] });

        if (alreadyRegistered.length !== 0) {
            Rest.json(res, 200, {err: true, log: "Você ja está matriculado nessa turma!"});
        } else {
            Classes.findOneAndUpdate(
                {code: req.body.code},
                {$push: {students: user._id}},
                {mew: true}
            ).then((newClass) => {
                if(!newClass)
                    Rest.json(res, 404, {err: err, log: "Código inválido!"})

                Rest.json(res, 200, "Matrícula em turma efeturada com sucesso!")
            }).catch((err) => {
                Rest.json(res, 404, {err: err, log: "Código inválido!"})
            });
        }
    } catch (err) {
        Rest.serverError(res, { err: err, log: "Problema interno no servidor." });
    }
}

async function getMyClasses(req, res) {
    try {

        var user = await Handlers.getUserOfHeaderAuthJWT(req, res);
        var resp = [];

        Classes.find({}).populate({path: 'teacherId', select:'name'}).exec((err, cls) => {
            if (err) {
                Rest.json(res, 500, {err: err, log: 'Algo deu errado.'});
            } else {
                cls.map(c => {
                    if (c.students.indexOf(user._id) !== -1) {
                        resp.push(c);
                    }
                });
                Rest.json(res, 200, resp);
            }
        });
        
    } catch (err) {
        Rest.json(res, 500, { err: err, log: "Problema interno no servidor." });
    }
}

module.exports = {
    getUsers: getUsers,
    addUser: addUser,
    deleteUser: deleteUser,
    joinAClass: joinAClass,
    getMyClasses: getMyClasses
};