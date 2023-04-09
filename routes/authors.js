const express = require('express');
const router = express.Router();
const Author = require('../models/author')

//All Authors router
router.get('/', async (req, res) => {
    let searchOptions = {}

    //We use req.query instead of req.body because form submits with GET are sent via req.query and POST uses req.body
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }

    try {
        const authorList = await Author.find(searchOptions)
        res.render('authors/index', { authors: authorList })
    } catch {
        res.redirect('/')
    }
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
        // res.redirect(`authors/${newAuthor}`)
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: "Error creating Author"
        })
    }
})

module.exports = router