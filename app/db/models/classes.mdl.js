const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = Schema({
    name: {
        unique: true,
        required : true,
        type: String
    },
    optional_email: {
        unique: true,
        type: String
    },
    schedule: {
        unique: true,
        type: String
    },
    number: {
        unique: true,
        type: String
    },
    semester: {
        require: false,
        type: String
    },
    office_hours: {
        require: false,
        type: String
    },
    info: {
        require: false,
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
    monitors : [{type: Schema.Types.ObjectId, ref:'Users'}],


}, {collection : 'classes'});

module.exports = mongoose.model('Classes', classSchema);