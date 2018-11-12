const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = Schema({
    name: {
        required : true,
        type: String
    },
    optional_email: {
        type: String
    },
    schedule: {
        type: String
    },
    number: {
        type: String
    },
    semester: {
        type: String
    },
    office_hours: {
        type: String
    },
    info: {
        type: String
    },
    teacherId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    code: {
        required: true,
        type: String,
        unique: true
    },
    students : [{type: Schema.Types.ObjectId, ref:'Users'}],
    monitors : [{type: String}],
    //monitors : [{type: Schema.Types.ObjectId, ref:'Users'}],



}, {collection : 'classes'});

module.exports = mongoose.model('Classes', classSchema);
