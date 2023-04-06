if (process.env.NODE_ENV !== 'production') {
    require('dotenv').parse()
}

const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); //__dirname refers to the current directory
app.set('layout', 'layouts/layout'); //All layouts are stored here
//tell express we are using expressLayout. An inbuilt method
app.use(expressLayouts);
//Public files, stylesheets, images location
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection;

//Show error
db.on('error', error => console.error(error))

//Run once on app opening to display connected to Mongoose
db.once('open', () => console.log("Connected to Mongoose"))

app.use('/', indexRouter)

//listen on process.env.PORT or default to 3000
app.listen(process.env.PORT || 3000)