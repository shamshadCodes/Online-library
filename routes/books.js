const express = require('express');
const router = express.Router();
const Book = require('../models/author');
const Author = require('../models/author');

//All Books router
router.get('/', async (req, res) => {
    res.render('books')
})

//Add new Book page 
router.get('/new', async (req, res) => {
    try {
        const authors = await Author.find({})
        const book = new Book()
        res.render('books/new', { authors: authors, book: book })
    } catch {
        res.redirect('/')
    }
    res.render('books/new')
})

//Create Book
router.post('/', async (req, res) => {
    res.send("POST REQUEST FROM BOOKS")
})

module.exports = router