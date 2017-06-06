const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
mongoose.promise = global.promise
const mongodb = require('mongodb');
let {MongoClient, Server} = mongodb
let {Schema} = mongoose
const bodyParser = require('body-parser');
const seedDB = require('./seeds')
const Comment = require('./models/comment');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Userloginfo = require('./models/userlogin');
const GITHUB_ISSUE = `gh-5304`;

const app = express()
const PORT = process.env.PORT || 3000

seedDB() //Remove all campgrounds

//Passport configuration
app.use(require('express-session')({
  secret: 'There you are',
  resave: false,
  saveUninitialized: false

}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(Userloginfo.authenticate()))
passport.serializeUser(Userloginfo.serializeUser())
passport.deserializeUser(Userloginfo.deserializeUser())

app.use((req, res, next)=>{
  res.locals.currentUser = req.user
  next()
})

const Campground = require('./models/campgrounds')
// add Campgrounds


//MODELS

// mongoose.connect('mongodb://person:person@ds151059.mlab.com:51059/yelp?authSource=admin')
// mongoose.connect('mongodb://localhost/yelp_camp')
mongoose.connect(process.env.MONGODB_URI)
console.log(process.env.MONGODB_URI);
mongoose.connection.on('error', (error)=>{
  console.log('There is no connection');
  console.log(error);
}).once('connected', ()=>{
  console.log('Connected to mongodb');
})

// MongoClient.open('mongodb://person:person@ds151059.mlab.com:51059/yelp?authSource=admin', (err, database)=>{
// console.log(err);
// })


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

//MiddleWare
const isLoggedIn =(req, res, next) =>{
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

app.get('/', (req, res)=>{
  res.render('landing')
})

app.get('/campgrounds', (req, res)=>{
console.log(req.user);
  Campground.find({}, (err, campgrounds)=>{
    if(err){console.log(err);}
    else {
      res.render('campgrounds/index', {
        campgrounds,
        currentUser: req.user
      })
    }
  })

})

//show form to create a campground
app.get('/campgrounds/new', (req, res)=>{
  res.render('campgrounds/new.ejs')
})

app.post('/campgrounds', (req, res)=>{

Campground.create({
  name: req.body.name,
  image: req.body.url,
  description: req.body.description
}, (err, campgrounds)=>{

  console.log(campgrounds);
  if(err){console.log(err);}
  else {
    console.log(campgrounds);
    res.render('campgrounds/index', {
      campgrounds
    })
  }
})

res.redirect('/campgrounds')
})

app.get('/campgrounds/:id', (req,res)=>{
let {id} = req.params
  console.log(id);
  Campground.findById(id).populate('comments').exec((err, campgrounds)=>{
    if(err){console.log('error');}
    else {
      res.render('campgrounds/show', {
        campgrounds
      })
    }
  })

})

app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res)=>{
Campground.findById(req.params.id, (err, campgrounds)=>{
  if(err){console.log('err');}
  else {
        res.render('comments/new', {campgrounds})
  }
})

})

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res)=>{
  Campground.findById(req.params.id, (err,campgrounds)=>{
    if(err){
      console.log(err);
      res.redirect('/campgrounds')
    }

    else {
    Comment.create({
      text: req.body.comments.text,
      author: req.body.comments.author
    }, (err, comment)=>{
            if(err){console.log(err);}
            else {
              campgrounds.comments.push(comment)
              campgrounds.save()
              res.redirect(`/campgrounds/${req.params.id}`)
            }
    })
    }
  })
})
//Authorization Routes
app.get('/register', (req, res)=>{
  res.render('register', {
    errorMessage: ''
  })
})

app.post('/register', (req, res)=>{
  let newUser = new Userloginfo({username: req.body.username})
  Userloginfo.register(newUser, req.body.password, (err, user)=>{
    if(err){console.log(err.message);
  return  res.render('register', {
    errorMessage: err.message
  })}
passport.authenticate('local')(req, res, ()=>{
  res.redirect('/campgrounds')
})
  })
})

//Show login form
app.get('/login', (req, res)=>{
  res.render('login')
})
let userAuth = passport.authenticate('local',
{
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
})
app.post('/login', userAuth, (req, res)=>{

})

//logout
app.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('campgrounds')
})

app.listen(PORT, ()=>{
  console.log(`Server up and running on port: ${PORT}`);
})
