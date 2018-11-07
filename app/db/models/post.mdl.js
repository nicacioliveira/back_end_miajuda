const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
CRUD e verificar se pode ou nao mexer
*/
const postSchema = Schema({
    author: {
        require: true,
        type: Schema.Types.ObjectId, 
        ref:'Users'
    },
    title: {
        unique: true,
        required : true,
        type: String
    },
    text_body: {
        type: String,
        default: ''
    },
    createdAt: {
        require: true,
        type: Date,
        default: Date.now
    }

}, {collection : 'posts'});

module.exports = mongoose.model('Posts', postSchema);