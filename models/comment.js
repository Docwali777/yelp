const mongoose = require('mongoose');
let {Schema} = mongoose

const commentSchema = new Schema({
text: String,
author: String
})
module.exports = mongoose.model('Comment', commentSchema)
