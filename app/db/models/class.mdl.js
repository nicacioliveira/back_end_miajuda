const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = Schema({
    name: {
        required : true,
        type: String
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    students : [String],
    monitors : [String]

}, {collection : 'classes'});

module.exports = mongoose.model('Classes', userSchema);