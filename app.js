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
  res.render('index', { title: 'Home',  });
 });

 app.get('/edit', (req, res) => {
  res.render('edit', { title: 'Edit',  });
 });


app.use(createroutes)

app.use(bloglistroutes)
  
  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
app.listen(PORT, (err) => {
    if (err) throw err

    console.log('This app is running on port 8000')
})