var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/loginlogout");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
});
userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);
