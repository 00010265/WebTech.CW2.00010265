const express = require('express')
const router = express.Router();
const generateUniqueId = require('generate-unique-id');
const fs = require('fs')
const parser = require('body-parser')

const Validator = require("./formvalidator")
const validate = new Validator()


router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Blog'});
   });

  router.post('/create', (req, res) => {
        
    if (validate.isValid(req.body)) {
        const title = req.body.title
        const snippet = req.body.snippet
        const mainbody = req.body.mainbody

        
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
    } else {
      res.render("create", { error: true, success: false })
    }


 });
 module.exports = router;