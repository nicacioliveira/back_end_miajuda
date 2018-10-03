const Users = require('../db/models/users.mdl');
const Classes = require('../db/models/classes.mdl');
const Rest = require('../util/services/rest');
const Tokens = require('../db/models/tokens.mdl');
const bcrypt = require('bcryptjs');
const Time = require('../util/helpers/time');
const TokenGenerator = require("../util/security/token-generator");

async function getUsers(req, res, next) {
    var users = [];
    var dbUsers = await Users.find();

    for (var u of dbUsers) {
        users.push(u);
    }

    Rest.json(res, 200, users);
}

async function addUser(req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var usr = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    };

    Users.create(usr).then((user) => {
        //usr created
        Rest.json(res, 200, {user: user});
    }).catch((err) => {
        Rest.json(res, 500, {err: err});
    });
}

async function deleteUser(req, res) {
    Users.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) {
            Rest.json(res, 500, {err: err});
        } else {
            Rest.json(res, 200, "Usuário removido.");
        }
    });
}

async function generateToken(req, res) {
    TokenGenerator.generateToken(req, res);
};

async function joinAClass(req, res) {
    var existingToken = await Tokens.findOne({token: req.body.token});
    console.log(existingToken);
    Tokens.findOne(req.body.token, (err, token) => {
        if (err) {
            Rest.json(res, 500, "Token não existe");
        } else {
            console.log(token);
            var newTk = TokenGenerator.checkToken(token);
            if(newTk != 1) {
                console.log(newTk);
                Classes.findOne({teacherId: newTk.created_by}, (err, classe) => {
                    if (!err){
                       // console.log(classe.students);
                        Rest.json(res, 200, classe);
                    } else {
                        Rest.json(err, 500, "User not found");
                    }

                });            //Add User in Class
            }else {
                Rest.json(res, 500, "Date expired");
            }

        }
    });
}

module.exports = {
    getUsers : getUsers,
    addUser : addUser,
    deleteUser: deleteUser,
    generateToken: generateToken,
    joinAClass: joinAClass
};