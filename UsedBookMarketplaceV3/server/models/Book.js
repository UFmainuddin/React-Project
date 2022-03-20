const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const bookSchema = new Schema({

    bookName: {
        type: String,
        required: true,
    },

    photoUrl: {
        type: String,
        required: true,
    },
    
    bookCondition: {
        type: String,
        required: true,
    },

    discription: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    seller: {
        type: ObjectId,
        ref: "User"
    }

});

module.exports = new Model('Book', bookSchema);