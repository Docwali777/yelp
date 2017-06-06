const mongoose = require('mongoose');
let { Schema} = mongoose
let passportLocalMongoose = require('passport-local-mongoose')


let UserlogSchema = new Schema({
  username: String,
  password: String
})
UserlogSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('Userlogin', UserlogSchema)
