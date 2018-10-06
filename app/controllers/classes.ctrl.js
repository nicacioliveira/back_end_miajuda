const Class = require('../db/models/classes.mdl');
const Rest = require('../util/services/rest');


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
        var newClass = {
            name: req.body.name,
            teacherId: req.body.teacherId,
            students: req.body.students,
            monitors: req.body.monitors
        };

        Class.create(newClass).then((classresp) => {
            Rest.json(res, 200, { class: newClass });
        }).catch((err) => {
            if (err.code === 11000) {
                Rest.json(res, 401, { log: err, msg: "Essa turma já existe!" });
            } else {
                Rest.json(res, 500, { err: err });
            }
        });
    } catch (err) {
        Rest.serverError(res, { log: err, msg: "Problema interno no servidor." });
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