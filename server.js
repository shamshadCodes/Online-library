if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const methodOverride = require('method-override') //helps the server call put and delete routes

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); //__dirname refers to the current directory
app.set('layout', 'layouts/layout'); //All layouts are stored here
//tell express we are using expressLayout.
app.use(expressLayouts);
//Public files, stylesheets, images location
app.use(express.static('public'))
//Using bodyParser passing data in url; limit 10mb
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(methodOverride('_method'))

console.log(process.env.DATABASE_URL, typeof process.env.DATABASE_URL)

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

//Show error
db.on('error', error => console.error(error))

//Run once on app opening to display connected to Mongoose
db.once('open', () => console.log("Connected to Mongoose"))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

//listen on process.env.PORT or default to 3000
app.listen(process.env.PORT || 3000)