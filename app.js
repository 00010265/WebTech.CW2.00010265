const express = require('express')
const app = express()
const PORT = 3000
const fs = require('fs')

const parser = require('body-parser')
const createroutes = require("./routes/createroutes")
const bloglistroutes = require("./routes/bloglistroute")

app.use('/static', express.static('public'))//assets
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  fs.readFile('./data/blogs.json', (err,data) => {
    if (err) throw err
    let indexlist = []
    indexlist = JSON.parse(data)
    indexlistchanged = indexlist.slice(0,3)
    res.render('index', {blogs: indexlistchanged})
  })
 });

app.get('/api/v1/blogs', (req,res) => {
  fs.readFile('./data/blogs.json', (err,data) => {
    if (err) throw err

    const blogs = JSON.parse(data)

    res.json(blogs)
  })
})

app.use(createroutes)

app.use(bloglistroutes)
  
  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
app.listen(PORT, (err) => {
    if (err) throw err

    console.log('This app is running on port 3000')
})