const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disciplineScheme = Schema({
    name: {
        required : true,
        type: String
    },
    classNumber: {
        required : false,
        type: Number
    },
    credits: {
        required: true,
        type: Number
    },
    students : {
        required : false,
        type : [Schema.Types.ObjectId]
    }
}, {collection: 'disciplines'});

module.exports = mongoose.model('Disciplines', userSchema);