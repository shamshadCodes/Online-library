const express = require('express');
const router = express.Router();
const Author = require('../models/author')
const Book = require('../models/book')

//All Authors router
router.get('/', async (req, res) => {
    let searchOptions = {}

    //We use req.query instead of req.body because form submits with GET are sent via req.query and POST uses req.body
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }

    try {
        const authorList = await Author.find(searchOptions)
        res.render('authors/index', { authors: authorList, searchOptions: req.query })
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
        res.redirect(`authors/${newAuthor.id}`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: "Error creating Author"
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        const books = await Book.find({ author: author.id }).limit(6).exec()
        res.render('authors/show', {
            author: author,
            booksByAuthor: books
        })
    } catch {

    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', { author: author })
    } catch {
        res.redirect('/authors')
    }
})

router.put('/:id', async (req, res) => {
    let author;

    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)
    } catch {
        if (author == null) {
            res.redirect('/')
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: "Error updating Author"
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        await Author.deleteOne({ _id: req.params.id })
        res.redirect('/authors')
    } catch {
        if (author == null) {
            res.redirect('/')
        } else {
            res.redirect(`/authors/${author.id}`)
        }
    }
    // try {
    //     await Author.deleteOne({ _id: req.params.id })
    //     res.redirect(`/authors`)
    // } catch (err) {
    //     console.log(err)
    //     res.redirect(`/authors/${req.params.id}`)
    // }
})

module.exports = router;