const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: { type: String,  required: true },
    startTime: { type: Number, required: true },
    expireTime: { type: Number, required: true }
});

module.exports = mongoose.model('Food', FoodSchema);