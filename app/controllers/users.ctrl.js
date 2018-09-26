const Users = require('../db/models/users.mdl');
const Rest = require('../util/services/rest');
const bcrypt = require('bcryptjs');

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


module.exports = {
    getUsers : getUsers,
    addUser : addUser,
    deleteUser: deleteUser
};