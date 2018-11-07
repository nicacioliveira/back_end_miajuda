const Posts = require('../../db/models/post.mdl');
const Rest = require('../../util/services/rest');
const Handler = require("../../util/helpers/handlers");
const { isEmpty } = require('../../util/helpers/stringCheckers');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function addPost(req, res) {
    try {

        var user = await Handler.getUserOfHeaderAuthJWT(req, res);

        var newPost = {
            title: req.body.title || '',
            author: user,
            text_body: req.body.text_body || '',
        }

        await Posts.create(newPost).then(resp => {
            var postResp = {
                _id: resp._id,
                title: resp.title,
                text_body: resp.text_body,
                author: { name: resp.author.name, email: resp.author.email, role: resp.author.role },
                createdAt: resp.createdAt
            }
            Rest.ok(res, postResp);
        }).catch(err => {
            Rest.somethingWentWrong(res, err);
        });

    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function getPosts(req, res) {
    try {
        var allPosts = await Posts.find({});
        Rest.ok(res, allPosts);
    } catch (err) {
        Rest.somethingWentWrong(res, err);
    }
}

async function updatePost(req, res) {
    try {
        var user = await Handler.getUserOfHeaderAuthJWT(req, res);

        if (isEmpty(req.body._id))
            Rest.idIsRequired(res, true);
        else {
            await Posts.findOneAndUpdate({ _id: req.body._id, author: new ObjectId(user._id) }, req.body, { new: true }).then((updated) => {
                if (!updated)
                    Rest.postNotFound(res, true);
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

async function deletePost(req, res) {
    try {
        var user = await Handler.getUserOfHeaderAuthJWT(req, res);
        
        if (isEmpty(req.params.id))
            Rest.idIsRequired(res, true);
        else {
           await Posts.findOneAndDelete({ _id: req.params.id, author: new ObjectId(user._id) }).then((resp) => {
                if (!resp)
                    Rest.postNotFound(res, true);
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

module.exports = {
    addPost: addPost,
    getPosts: getPosts,
    updatePost: updatePost,
    deletePost: deletePost
};