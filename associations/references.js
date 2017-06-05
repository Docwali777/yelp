const mongoose = require('mongoose');
let { Schema} = mongoose
mongoose.connect('mongodb://localhost/blog_demo_2')
let Post = require('../models/posts')
let User = require('../models/user')


User.findOne({email: 'adfdafds@face.bon' }).populate('posts').exec((err, user)=>{
  if(err){console.log('error');}
  else {
    console.log(user);
  }
})
