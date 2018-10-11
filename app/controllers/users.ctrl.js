const Users = require('../db/models/users.mdl');
const Classes = require('../db/models/classes.mdl');
const Rest = require('../util/services/rest');
const bcrypt = require('bcryptjs');
const Time = require('../util/helpers/time');
const Handlers = require('../util/helpers/handlers');
const Authenticator = require('../util/security/authenticator');
const {isEmpty} = require('../util/helpers/stringCheckers');

async function login(req, res) {
    try {
        await Users.findOne({ email: req.body.email }, (err, user) => {
            if (!user) {
                Rest.unregisteredUser(res, true);

            } else if (!bcrypt.compareSync(req.body.password, user.password)) {
                Rest.wrongPassword(res, true);

            } else {
                var token = Authenticator.generateJWT(user);
                Rest.ok(res, { user: { name: user.name, email: user.email, role: user.role }, jwt: token });
            }
        });
    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function getUsers(req, res, next) {
    try {
        var users = [];
        var dbUsers = await Users.find();

        for (var u of dbUsers) {
            users.push(u);
        }
        Rest.ok(res, users);
    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function addUser(req, res) {
    try {

        if (isEmpty(req.body.name))
            Rest.nameIsRequired(res, true);

        else if (isEmpty(req.body.email))
            Rest.emailIsRequired(res, true);

        else if (isEmpty(req.body.password))
            Rest.passwordIsRequired(res, true);
        
        else if (isEmpty(req.body.role))
            Rest.roleIsRequired(res, true);

        else {

            var hashedPassword = bcrypt.hashSync(req.body.password, 8);

            var usr = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role
            };

            Users.create(usr).then((user) => {
                Rest.ok(res, user);
            }).catch((err) => {
                if (err.code === 11000)
                    Rest.userAlreadyExists(res, true);
                else
                    Rest.somethingWentWrong(res, err);
            });
        }
    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function deleteUser(req, res) {
    try {
       await  Users.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                Rest.somethingWentWrong(res, true);
            } else {
                Rest.ok(res, true);
            }
        });
    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function joinAClass(req, res) {
    try {
        var user = await Handlers.getUserOfHeaderAuthJWT(req, res);

        if (!req.body.code)
            Rest.classCodeisEmpty(res, true);
        
        var alreadyRegistered = await Classes.find({code: req.body.code, students: [user._id] });

        if (alreadyRegistered.length !== 0) {
            Rest.alreadyEnrolledInTheClass(res);
        } else {
            Classes.findOneAndUpdate(
                {code: req.body.code},
                {$push: {students: user._id}},
                {mew: true}
            ).then((newClass) => {
                if(!newClass)
                    Rest.invalidClasscode(res, true);

                Rest.ok(res, newClass);
            }).catch((err) => {
                Rest.somethingWentWrong(res, err);
            });
        }
    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function getMyClasses(req, res) {
    try {

        var user = await Handlers.getUserOfHeaderAuthJWT(req, res);
        var resp = [];

        Classes.find({}).populate({path: 'teacherId', select:'name'}).exec((err, cls) => {
            if (err) {
                Rest.somethingWentWrong(res, err);
            } else {
                cls.map(c => {
                    if (c.students.indexOf(user._id) !== -1) {
                        resp.push(c);
                    }
                });
                Rest.ok(res, resp);
            }
        });
    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

module.exports = {
    login: login,
    getUsers: getUsers,
    addUser: addUser,
    deleteUser: deleteUser,
    joinAClass: joinAClass,
    getMyClasses: getMyClasses
};