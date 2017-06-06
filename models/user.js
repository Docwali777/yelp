const mongoose = require('mongoose');
let {Schema} = mongoose


let userSchema = new Schema({
  email: String,
  name: String,
  posts: [
    {type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'}
  ]
})

Usern
module.exports = mongoose.model('User', userSchema)
