const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItem = new Schema({
    name: { type: String,  required: true },
    startTime: { type: Number, required: true },
    expireTime: { type: Number, required: true }
});

const User = new Schema({
    firstName: { type: String, required: true },
    lastName: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
    refrigerator: [ FoodItem ],
    freezer: [ FoodItem ]
});

module.exports = mongoose.model('user', User);