const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: { type: String,  required: true },
  startTime: { type: String, required: true },
  expireTime: { type: String, required: true }
});

module.exports = mongoose.model('Food', FoodSchema);