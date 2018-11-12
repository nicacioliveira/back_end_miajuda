const Classes = require('../../db/models/classes.mdl');
const Rest = require('../../util/services/rest');
const classcodeGenerator = require('../../util/security/classCodeGenerator');
const Users = require('../../db/models/users.mdl');
const Posts = require('../../db/models/post.mdl');
const Handlers = require('../../util/helpers/handlers');
const { isEmpty } = require('../../util/helpers/stringCheckers');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function getClasses(req, res, next) {
    try {
        var classes = [];
        var dbClasses = await Classes.find()
            .populate({
                path: 'teacherId',
                select: 'name'
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

        var user = await Handlers.getUserOfHeaderAuthJWT(req, res);

        if (user.role != "professor")
            Rest.isNotA(res, true, "professor")
        else if (isEmpty(req.body.name))
            Rest.nameIsRequired(res, true);
        else {
            var classCode = await classcodeGenerator.genUniqueCode();

            var newClass = {
                name: req.body.name,
                optional_email: req.body.optional_email || '',
                schedule: req.body.schedule || '',
                number: req.body.number || '',
                semester: req.body.semester || '',
                office_hours: req.body.office_hours || '',
                info: req.body.info || '',
                teacherId: user._id,
                code: classCode,
                students: req.body.students || [],
                monitors: req.body.monitors || []
            }

            await Classes.create(newClass).then((classresp) => {
                Rest.json(res, 200, { class: classresp });
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
        var user = await Handlers.getUserOfHeaderAuthJWT(req, res);

        if (user.role !== "professor")
            Rest.notAuthorized(res, true);
        else if (isEmpty(req.params.id))
            Rest.idIsRequired(res, true);
        else {
            Classes.findOneAndDelete({ _id: req.params.id, teacherId: user._id }).then((resp) => {
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
        var user = await Handlers.getUserOfHeaderAuthJWT(req, res);

        if (user.role !== "professor")
            Rest.notAuthorized(res, true);
        else if (isEmpty(req.body._id))
            Rest.idIsRequired(res, true);
        else {
            await Classes.findOneAndUpdate({ _id: req.body._id, teacherId: user._id }, req.body, { new: true }).then((updated) => {
                if (!updated)
                    Rest.classNotFound(res, true);
                else
                    Rest.ok(res, updated);
            }).catch((err) => {
                Rest.notAuthorized(res, err);
            });
        }
    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function removeStudentFromClass(req, res) {
    try {
        var user = await Handlers.getUserOfHeaderAuthJWT(req, res);

        if (isEmpty(req.body.studentId))
            Rest.idIsRequired(res, true);
        else {
            Classes.findOneAndUpdate(
                { _id: req.params.classId, teacherId: user._id },
                { $pull: { students: req.body.studentId } },
                { new: true },
                (err, Class) => {
                    if (err) {
                        Rest.somethingWentWrong(res, err);
                    } else {
                        Rest.ok(res, true);
                    }
                });
        }
    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function getPosts(req, res) {
    //body classId
    try {
        await Handlers.getUserOfHeaderAuthJWT(req, res);
        var cl = await Handlers.getClassById({ body: { classId: req.params.classId } }, res);

        var resp = await Posts.find({ 'class': new ObjectId(cl._id) });
        Rest.ok(res, resp);

    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

module.exports = {
    getClasses: getClasses,
    addClass: addClass,
    deleteClass: deleteClass,
    updateClass: updateClass,
    removeStudentFromClass: removeStudentFromClass,
    getPosts: getPosts
};
