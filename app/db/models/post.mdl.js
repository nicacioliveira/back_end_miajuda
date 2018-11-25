const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = Schema({
    author: {
        require: true,
        type: Schema.Types.ObjectId, 
        ref:'Users'
    },
    class: {
        require: true,
        type: Schema.Types.ObjectId, 
        ref:'Classes'
    },
    title: {
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