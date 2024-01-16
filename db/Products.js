const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'required name'],
    },
    id: {
        type: String,
        required: [true, 'required id'],
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    category: {
        type: String,
        required: [true, 'required category'],
    },
    title: {
        type: String,
        required: [true, 'required title'],
    },
    strikeprice: {
        type: Number,
        required: [true, 'required strikeprice'],
    },
    price: {
        type: Number,
        required: [true, 'required price'],
    },
    star: {
        type: Number,
        required: [true, 'required star'],
    },
    review: {
        type: Number,
        required: [true, 'required review'],
    },
    color: {
        type: String,
        required: [true, 'required color'],
    },
    size: {
        type: String,
        required: [true, 'required size'],
    },
    stock: {
        type: Number,
        required: [true, 'required stock'],
    },

});

module.exports = mongoose.model("products", ProductsSchema);