const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  uid: { type: String, unique:true },
  name: String,
  email: String,
  role: String,
  password: String
});

const User = mongoose.model('User',UserSchema);
module.exports = {User}