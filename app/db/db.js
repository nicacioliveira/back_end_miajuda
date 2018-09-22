const mongoose = require('mongoose');
const Config = require('../util/constants/config');

mongoose.connect(Config.DATABASE, { useNewUrlParser: true });

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + Config.DATABASE);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});