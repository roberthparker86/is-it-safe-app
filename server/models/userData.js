const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');


const User = new Schema({

    firstName: { 
      type: String,
      trim: true, 
      required: true,
      max: 30 
    },
    lastName: String,

    email: { 
      type: String, 
      required: true,
      unique: true,
    },

    hashed_password: { 
      type: String, 
      required: true 
    },
    salt: String,

    refrigerator: [],
    freezer: []
});

User
  .virtual('password')
  .set(function (password) {
    // create temp password to salt and hash, than store in hashed_password
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

User.methods = {

  authenticate: function (plaintext) {
    return this.encryptPassword(plaintext) === this.hashed_password;
  },

  encryptPassword: function (password) {

    if (!password) return '';

    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');

    } catch (err) {
      return 'encrypt catch error';
    }
  },

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  }
};

module.exports = mongoose.model('user', User);