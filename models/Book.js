const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    userId : mongoose.Schema.Types.ObjectId,
    tittle: {
        type: String,
    },
    published: {
        type: Boolean,
        default: false
    },
    comments: [{ message: String }],
    meta: {
        votes: Number,
        favs: Number
    }
});

module.exports = mongoose.model('book', BookSchema);