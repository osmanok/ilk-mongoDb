const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        userId : {
          type: mongoose.Schema.Types.ObjectId,
        },
        fullname: {
            type: String,
        },
        age: {
            type: Number,
        }
    }
);

module.exports = mongoose.model('user', UserSchema);