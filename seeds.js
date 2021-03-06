const mongoose = require('mongoose');
const Campground = require('./models/campgrounds')
const Comment = require('./models/comment')

const data = [
  {
    name: 'Water',
    image: 'https://farm1.staticflickr.com/66/158583580_79e1c5f121.jpg',
    description: 'Lorem ipsum dolor sit amet, inani molestie quo id, vel novum indoctum erroribus ne, lorem mnesarchum ea sea. Eos semper facete facilisi no, utamur nostrud molestiae cu eum. Nostrum inciderint consequuntur no quo, deleniti consulatu no usu, ius id nominavi quaestio persequeris. Nisl graeco accusata vel ei. Ei eam impetus prompta, vel melius civibus id. Qui ut diam mutat reque, in eum nemore comprehensam.'

  },
  {
    name: 'temple',
    image: 'https://farm7.staticflickr.com/6235/6331312011_7722a2d6d8.jpg',
    description: 'Lorem ipsum dolor sit amet, inani molestie quo id, vel novum indoctum erroribus ne, lorem mnesarchum ea sea. Eos semper facete facilisi no, utamur nostrud molestiae cu eum. Nostrum inciderint consequuntur no quo, deleniti consulatu no usu, ius id nominavi quaestio persequeris. Nisl graeco accusata vel ei. Ei eam impetus prompta, vel melius civibus id. Qui ut diam mutat reque, in eum nemore comprehensam.'

  },
  {
    name: 'Rose',
    image: 'https://farm4.staticflickr.com/3833/9923522516_12b572507c.jpg',
    description: 'Lorem ipsum dolor sit amet, inani molestie quo id, vel novum indoctum erroribus ne, lorem mnesarchum ea sea. Eos semper facete facilisi no, utamur nostrud molestiae cu eum. Nostrum inciderint consequuntur no quo, deleniti consulatu no usu, ius id nominavi quaestio persequeris. Nisl graeco accusata vel ei. Ei eam impetus prompta, vel melius civibus id. Qui ut diam mutat reque, in eum nemore comprehensam.'

  }
]

let seedDB = ()=>{
  Campground.remove({}, (err, campgrounds)=>{
    if(err){console.log('error');}
    else {
      console.log('data removes');
      data.forEach(seed=>{
        Campground.create(seed, (err, campgrounds)=>{
          if(err){console.log('error with seed DATA');}
          else {
            console.log('data added');
            Comment.create({
              text: 'This is working',
              author: 'Wali gauvin'
            }, (err, comment)=>{
              if(err){console.log('error');}
              else {
                campgrounds.comments.push(comment)
                campgrounds.save()
                console.log('new comment created');
              }
            })
          }
        })
      })
    }
  })
}



module.exports = seedDB
