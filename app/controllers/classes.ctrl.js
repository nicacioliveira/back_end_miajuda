const Class = require('../db/models/classes.mdl');
const Rest = require('../util/services/rest');
const classcodeGenerator = require('../util/security/classCodeGenerator');
const Users = require('../db/models/users.mdl');
const Handles = require('../util/helpers/handlers');

async function getClasses(req, res, next) {
    try {
        var classes = [];
        var dbClasses = await Class.find().populate({
            path: 'teacherId',
            select:
                'name'
        });
        for (var c of dbClasses) {
            classes.push(c);
        }
        Rest.json(res, 200, classes);

    } catch (err) {
        Rest.serverError(res, { log: err, msg: "Problema interno no servidor." });
    }
}

async function addClass(req, res, next) {
    try {

        var user = await Handles.getUserOfHeaderAuthJWT(req, res);
        
        if (user.role != "professor")
            Rest.json(res, 404, {err: null, log: "Usuário não é um professor!"});

        if (!req.body.name)
            Rest.json(res, 404, {err: true, log: "O campo nome não pode ser vazio!"})

        var classCode = await classcodeGenerator.genUniqueCode();
    
        var newClass = {
            name: req.body.name,
            teacherId: user._id,
            code: classCode,
            students: req.body.students,
            monitors: req.body.monitors
        }

        await Class.create(newClass).then((classresp) => {
            Rest.json(res, 200, { class: newClass });
        }).catch((err) => {
            if (err.code === 11000) {
                Rest.json(res, 401, { err: err, log: "Essa turma já existe!" });
            } else {
                Rest.json(res, 500, { err: err });
            }
        });

    } catch (err) {
        Rest.serverError(res, { err: err, log: "Problema interno no servidor." });
    }
}

async function deleteClass(req, res) {
    try {
        Class.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                Rest.json(res, 500, { err: err });
            } else {
                Rest.json(res, 200, "Turma removida.");
            }
        });
    } catch (err) {
        Rest.serverError(res, { log: err, msg: "Problema interno no servidor." });
    }
}

module.exports = {
    getClasses: getClasses,
    addClass: addClass,
    deleteClass: deleteClass
};