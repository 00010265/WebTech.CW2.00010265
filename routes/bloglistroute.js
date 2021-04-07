const express = require('express')
const app = express()
const router = express.Router();
const fs = require('fs')
const parser = require('body-parser')
const Validator = require("./formvalidator")
const validate = new Validator()

const generateUniqueId = require('generate-unique-id');


let blogsDb = []
fs.readFile('./data/blogs.json', (err, data) => {
	if (!err) {
		blogsDb = JSON.parse(data)
	}
})


  router.get('/bloglist', (req, res) => {
    fs.readFile('./data/blogs.json', (err,data) => {
      if (err) throw err
      const blogs = JSON.parse(data)
      res.render('bloglist', {blogs: blogs})
    })
   });



   router.get('/bloglist/:id', (req, res) => {
    const id = req.params.id
    const blog = blogsDb.find(blog => blog.id === id)

	res.render('details', {blog: blog})
  })
  router.get('/bloglist/:id/edit', (req, res) => {
    const id = req.params.id
    const blog = blogsDb.find(blog => blog.id === id)

	res.render('edit', {blog: blog})
  })

  router.post('/edit', (req, res) => {
     const id = req.params.id
     blog = blogsDb.find(blog => blog.id === id)
     const blogs = blogsDb  
     const index = blogsDb.findIndex(note => note.id === id)
    if (validate.isValid(req.body)) {
        title = req.body.title
        snippet = req.body.snippet
        mainbody = req.body.mainbody
        blogsDb.splice(index, 1)
        newid=generateUniqueId()
        blogs.push({
            id: newid,
            title: title,
            snippet: snippet,
            mainbody: mainbody,
          })
        blog = blogsDb.find(blog => blog.id === newid)
        fs.readFile('./data/blogs.json', (err, data) =>{
        if (err) throw err
        })
    
        fs.writeFile('./data/blogs.json', JSON.stringify(blogs), err =>{
          if (err) throw err
          res.render("edit", { error: false, success: true, blog: blog })
         })
      }
      else {
      res.render("edit", { error: true, success: false, blog: blog })
    }})



  router.get('/bloglist/:id/delete', (req, res) => {
    const id = req.params.id
    const index = blogsDb.findIndex(blog => blog.id === id)
  
    blogsDb.splice(index, 1)
  
    fs.writeFile('./data/blogs.json', JSON.stringify(blogsDb), (err) => {
      if (err) {
        res.redirect('/bloglist?success=0')
      } else {
        res.redirect('/bloglist?success=1')
      }
    })
  })
  
  module.exports = router;