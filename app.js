const express = require('express')
const app = express()
const PORT = 8000

app.set('view engine', 'pug')

app.use('/static', express.static('public'))

app.get('/', (req,res) => {
    res.render('index')
})

app.listen(PORT, (err) => {
    if (err) throw err

    console.log('This app is running on port ${PORT}')
})