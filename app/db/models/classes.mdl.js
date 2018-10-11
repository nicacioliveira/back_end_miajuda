const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = Schema({
    name: {
        unique: true,
        required : true,
        type: String
    },
    teacherId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    code: {
        require: true,
        type: String,
        unique: true
    },
    students : [{type: Schema.Types.ObjectId, ref:'Users'}],
    monitors : [{type: Schema.Types.ObjectId, ref:'Users'}]

}, {collection : 'classes'});

module.exports = mongoose.model('Classes', classSchema);