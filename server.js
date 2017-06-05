const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
let {Schema} = mongoose
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/yelp_camp')

mongoose.connection.on('error', ()=>{
  console.log('There is no connection');
}).once('connected', ()=>{
  console.log('Connected to mongodb');
})

const app = express()
const PORT = process.env.PORT || 3000

//Schema Set-up
let campgroundSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }

})

var Campground = mongoose.model('Campground', campgroundSchema)

// Campground.create({
//   name: 'People Sparks Trail',
//   url: 'https://farm4.staticflickr.com/3560/3359900715_835e7b54d7.jpg',
//   description: 'Meets my Expectiontations of a great trail'
// }, (err, campground)=>{
//   if(err){console.log(err);}
//   else {
//     console.log(`created new campground`, campground);
//   }
// })

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static('views'))
app.use(express.static('/styles'))

app.get('/', (req, res)=>{
  res.render('landing')
})

app.get('/campgrounds', (req, res)=>{
  Campground.find({}, (err, campgrounds)=>{
    if(err){console.log(err);}
    else {
      res.render('index', {
        campgrounds
      })
    }
  })

})

//show form to create a campground
app.get('/campgrounds/new', (req, res)=>{
  res.render('new.ejs')
})

app.post('/campgrounds', (req, res)=>{

Campground.create({
  name: req.body.name,
  url: req.body.url,
  description: req.body.description
}, (err, campgrounds)=>{
  if(err){console.log(err);}
  else {
    console.log(campgrounds);
    res.render('campgrounds', {
      campgrounds
    })
  }
})

res.redirect('campgrounds')
})

app.get('/campgrounds/:id', (req,res)=>{
let {id} = req.params
    Campground.findById(id, (err, campground)=>{
      if(err){console.log(err);}
      else {
        console.log(campground);
        res.render('show', {
          campground
        })
      }
    })

})



app.listen(PORT, ()=>{
  console.log(`Server up and running on port: ${PORT}`);
})
