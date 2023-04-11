const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// authorSchema.pre("deleteOne", async function (next) {
//     try {
//         const query = this.getFilter();
//         console.log(this.getFilter())
//         const hasBook = await Book.exists({ author: query._id });

//         if (hasBook) {
//             next(new Error("This author still has books."));
//         } else {
//             next();
//         }
//     } catch (err) {
//         console.log(err)
//         next(err);
//     }
// });

authorSchema.pre('deleteOne', function (next) {
    const query = this.getFilter();
    Book.find({ author: query.id }).then(books => {
        if (books.length > 0) {
            next(new Error('This author still has books'))
        }
        else {
            next()
        }
    }).catch(err => {
        next(err)
    })
})

//Export a new model (mongoose.model)
module.exports = mongoose.model('Author', authorSchema)