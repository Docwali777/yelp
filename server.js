const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
let {Schema} = mongoose
const bodyParser = require('body-parser');
const seedDB = require('./seeds')

seedDB() //Remove all campgrounds

const Campground = require('./models/campgrounds')
// add Campgrounds


//MODELS

mongoose.connect('mongodb://localhost/yelp_camp')

mongoose.connection.on('error', ()=>{
  console.log('There is no connection');
}).once('connected', ()=>{
  console.log('Connected to mongodb');
})

const app = express()
const PORT = process.env.PORT || 3000


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

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
  console.log(id);
  Campground.findById(id).populate('comments').exec((err, campgrounds)=>{
    if(err){console.log('error');}
    else {
      console.log(campgrounds);
      res.render('show', {
        campgrounds
      })
    }
  })

})



app.listen(PORT, ()=>{
  console.log(`Server up and running on port: ${PORT}`);
})
