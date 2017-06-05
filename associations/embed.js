const mongoose = require('mongoose');
let { Schema} = mongoose
mongoose.connect('mongodb://localhost/blog_demo')

let postSchema = new Schema({
  title: String,
  content: String
})
let Post = mongoose.model('Post', postSchema)

//User model
let userSchema = new Schema({
  email: String,
  name: String,
  posts: [postSchema]
})
let User = mongoose.model('User', userSchema)
//PORt Schema

//
// let newUser = new User({
//   email: 'Toussint@gm.com',
//   name: 'Toussaint Gauvin'
// })
// newUser.posts.push({
//   title: 'How to brew potion',
//   content: 'blah blah'
// })
// newUser.save((err, user)=>{
//   if(err){console.log(err);}
//   else {
//     console.log(user);
//   }
// })
//
// let newPost = new Post({
//   title: 'Good Stuff reflecting',
//   content: 'Nice and sweet'
// })
// newPost.save((err, post)=>{
//   if(err){console.log('Error');}
//   else {
//     console.log(post);
//   }
// })
User.findOne({name: 'Toussaint Gauvin' }, (err, user)=>{
  if(err){console.log('Error finding NAME');}
  else {
  user.posts.push({
    title: 'One Love',
    content: 'Always find Love'
  })
  user.save((err, user)=>{
    if(err){console.log('not saved');}
    else {
      console.log(user);
    }
  })

  }
})
