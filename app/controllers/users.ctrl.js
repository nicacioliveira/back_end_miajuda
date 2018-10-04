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

    await Tokens.findOne({token: req.body.token})
    .then((tokenObj) => {
        //verify token
        var checkToken = TokenGenerator.checkToken(tokenObj);
        if (checkToken.err) 
            Rest.json(res, 500, checkToken.err);
     
        //verify user id
        Users.findOne({_id: req.body.user_id}).then((user) => {
            if (!user) {
                Rest.json(res, 500, "Usuário não existe");
            } else {
                //update class
                Classes.findOneAndUpdate(
                    {_id:   tokenObj.class_id}, 
                    {$push: {students: user.email}}, 
                    {new:   true},
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

}

async function getMyClasses(req, res) {
    Users.findOne({_id: req.params.id})
    .then((user) => {
        var resp = [];
        Classes.find({}, (err, cls) => {
            if (err) 
                Rest.json(res, 500, "Algo deu errado");
            else {
                cls.map(c => {
                    if (c.students.indexOf(user.email) !== -1) resp.push(c);
                });
                Rest.json(res, 200, resp);
            }
        });
    })
    .catch((err) => {
        Rest.json(res, 500, "Usuário não existe");
    })
}

module.exports = {
    getUsers : getUsers,
    addUser : addUser,
    deleteUser: deleteUser,
    generateToken: generateToken,
    joinAClass: joinAClass,
    getMyClasses: getMyClasses
};