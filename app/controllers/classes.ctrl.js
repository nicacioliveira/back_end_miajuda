const Classes = require('../db/models/classes.mdl');
const Rest = require('../util/services/rest');
const classcodeGenerator = require('../util/security/classCodeGenerator');
const Users = require('../db/models/users.mdl');
const Handles = require('../util/helpers/handlers');
const {isEmpty} = require('../util/helpers/stringCheckers');

async function getClasses(req, res, next) {
    try {
        var classes = [];
        var dbClasses = await Classes.find()
        .populate({
            path: 'teacherId',
            select:'name'
        });

        for (var c of dbClasses) {
            classes.push(c);
        }

        Rest.ok(res, classes);

    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function addClass(req, res, next) {
    try {

        var user = await Handles.getUserOfHeaderAuthJWT(req, res);
        
        if (user.role != "professor")
            Rest.isNotA(res, true, "professor")

        else if (isEmpty(req.body.name))
            Rest.nameIsRequired(res, true);
        else {
            var classCode = await classcodeGenerator.genUniqueCode();
        
            var newClass = {
                name: req.body.name,
                teacherId: user._id,
                code: classCode,
                students: req.body.students,
                monitors: req.body.monitors
            }

            await Classes.create(newClass).then((classresp) => {
                Rest.json(res, 200, { class: newClass });
            }).catch((err) => {
                if (err.code === 11000) {
                    Rest.classAlreadyExists(res);
                } else {
                    Rest.somethingWentWrong(res, err);
                }
            });
        }
    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function deleteClass(req, res) {
    try {
        var user = await Handles.getUserOfHeaderAuthJWT(req, res);

        if (user.role !== "professor")
            Rest.notAuthorized(res, true);
        else if (isEmpty(req.query.id))
            Rest.idIsRequired(res, true);
        else {

            Classes.findOneAndDelete({_id: req.query.id, teacherId: user._id}).then((resp) => {
                if (!resp)
                    Rest.classNotFound(res, true);
                else
                    Rest.ok(res, true);
            }).catch((err) => {
                Rest.notAuthorized(res, err);
            });
            
        }
    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function updateClass(req, res) {
    try {
        var user = await Handles.getUserOfHeaderAuthJWT(req, res);

        if (user.role !== "professor")
            Rest.notAuthorized(res, true);

        if (isEmpty(req.body._id))
            Rest.idIsRequired(res, true);

        await Classes.findOneAndUpdate({_id: req.body._id, teacherId: user._id}, req.body, {new: true}).then((updated) => {
            if (!updated)
                Rest.classNotFound(res, true);
            else
                Rest.ok(res, updated);
        }).catch((err) => {
            Rest.notAuthorized(res, err);
        });

    } catch(err) {
        Rest.somethingWentWrong(res, err);
    }
}


module.exports = {
    getClasses: getClasses,
    addClass: addClass,
    deleteClass: deleteClass,
    updateClass: updateClass
};