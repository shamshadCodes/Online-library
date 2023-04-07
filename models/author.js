const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

//Export a new model (mongoose.model)
module.exports = mongoose.model('Author', authorSchema)