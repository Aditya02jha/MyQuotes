const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.connect(keys.mongo.mongo_Connect_key);

const userSchema = new mongoose.Schema({
  userName: String,
  GoogleID: String,
  emailID: String
});

const User = mongoose.model('user' , userSchema);

module.exports = User;
