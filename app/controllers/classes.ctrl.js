const Class = require('../db/models/classes.mdl');
const Rest = require('../util/services/rest');


async function getClasses(req, res, next) {
    var classes = [];
    var dbClasses = await Class.find();
    for (var c of dbClasses) {
        classes.push(c);
    }

    Rest.json(res, 200, classes);
}

async function addClass(req, res, next) {
    var newClass = {
        name: req.body.name,
        teacherId: req.body.teacherId,
        students: req.body.students,
        monitors: req.body.monitors
    };

    Class.create(newClass).then( (classresp) =>{
        Rest.json(res, 200, {class: newClass});
    }).catch((err) => {
        Rest.json(res, 500, {err: err});
    });
}

async function deleteClass(req, res) {
    Users.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) {
            Rest.json(res, 500, {err: err});
        } else {
            Rest.json(res, 200, "Turma removida.");
        }
    });
}

module.exports = {
    getClasses: getClasses,
    addClass: addClass,
    deleteClass: deleteClass
};