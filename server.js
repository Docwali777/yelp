const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express()
const PORT = process.env.PORT || 3000

let campgrounds = [
  {
    name: 'SugarHill',
    url: 'https://farm4.staticflickr.com/3114/3571272604_0aa8b05f51.jpg'
  },
  {
    name: 'Billy Goat trail',
    url: 'https://farm7.staticflickr.com/6134/6013835836_0decc6f460.jpg'
  },
  {
    name: 'Bones and fiction',
    url: 'https://farm6.staticflickr.com/5486/14273566539_62d5205456.jpg'
  }
]

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
// app.set(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res)=>{
  res.render('landing')
})

app.get('/campgrounds', (req, res)=>{
  res.render('campgrounds', {
    campgrounds
  })
})

app.get('/campgrounds/new', (req, res)=>{

  res.render('new.ejs')
})

app.post('/campgrounds', (req, res)=>{
    let {name, url } = req.body
     campgrounds.push({name, url})
     let newc = [{name, url}]
//get data from form and add to campgrounds app
//redirect back to campground apge
res.redirect('campgrounds')
})


app.listen(PORT, ()=>{
  console.log(`Server up and running on port: ${PORT}`);
})
