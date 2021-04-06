const express = require('express')
const app = express()
const PORT = 3000
const fs = require('fs')
const generateUniqueId = require('generate-unique-id');
const parser = require('body-parser')

let blogsDb = []
fs.readFile('./data/blogs.json', (err, data) => {
	if (!err) {
		blogsDb = JSON.parse(data)
	}
})

app.use('/static', express.static('public'))//assets
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
   res.render('index', { title: 'Home',  });
  });


  app.get('/bloglist', (req, res) => {
    fs.readFile('./data/blogs.json', (err,data) => {
      if (err) throw err
      const blogs = JSON.parse(data)
      res.render('bloglist', {blogs: blogs})
    })
   });



   app.get('/bloglist/:id', (req, res) => {
    const id = req.params.id
    const blog = blogsDb.find(blog => blog.id === id)

	res.render('details', {blog: blog})
  })



  app.get('/create', (req, res) => {
    res.render('create', { title: 'Create Blog'});
   });

  app.post('/create', (req, res) => {
    const title = req.body.title
    const snippet = req.body.snippet
    const mainbody = req.body.title
   fs.readFile('./data/blogs.json', (err, data) =>{
     if (err) throw err

     const blogs = JSON.parse(data)

     blogs.push({
       id: generateUniqueId(),
       title: title,
       snippet: snippet,
       mainbody: mainbody,
     })

     fs.writeFile('./data/blogs.json', JSON.stringify(blogs), err =>{
       if (err) throw err
      res.render('create', {success: true})
      })
   })

   res.render('create', { title: 'Create Blog' });  });
  
  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
app.listen(PORT, (err) => {
    if (err) throw err

    console.log('This app is running on port 8000')
})