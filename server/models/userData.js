const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Food = require('./foodData');

const User = new Schema({
    firstName: { type: String, required: true },
    lastName: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
    refrigerator: [],
    freezer: []
});

module.exports = mongoose.model('user', User);