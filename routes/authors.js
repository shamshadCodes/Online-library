const express = require('express');
const router = express.Router();
const Author = require('../models/author')

//All Authors router
router.get('/', (req, res) => {
    res.render('authors/index')
})

//Add new Author page
router.get('/new', (req, res) => {
    //passing variables to the ejs file at views/authors/new
    res.render('authors/new', { author: new Author() })
})

//Create Author
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        // res.render(`authors/${newAuthor}`)
        res.render('authors')
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: "Error creating Author"
        })
    }
})

module.exports = router