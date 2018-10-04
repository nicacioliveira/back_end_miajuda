const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Time = require('../../util/helpers/time');

const tokenSchema = Schema({
    token: {
        required: true,
        type: String,
        unique: true
    },
    created_by: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    class_id : {
        require: false,
        type: Schema.Types.ObjectId,
        ref: "Classes"
    },
    expiration_date: {
        required: true,
        type: Date,
        default: threeMonthsFromNow
    },
    role: {
        type: String,
        enum: ['professor', 'monitor'],
        default: 'professor'
    }
}, {collection : 'tokens'});

module.exports = mongoose.model('Token', tokenSchema);


function threeMonthsFromNow() {
    return new Date(new Date().getTime() + Time.transformUnit('month', 'mili', 3));
}