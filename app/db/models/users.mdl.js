const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        required : true,
        type: String
    }, email: {
        required: true,
        type : String,
        unique : true
    }, password: {
        required : true,
        type : String
    }, role: {
        required: true,
        type: String,
        enum: ['aluno', 'monitor', 'professor'],
        default: 'aluno'
    }
}, {collection : 'users'});

userSchema.statics.isEmailTaken = function(email) {
    if (email)
        return this.findOne({email: email})
            .then(function (user) {
                return user ? true : false;
            });
};

module.exports = mongoose.model('Users', userSchema);