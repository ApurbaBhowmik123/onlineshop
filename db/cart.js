
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.String,
      ref: 'Users',
    },
    items: [String], // Array to store cart items
  });
  const cart = mongoose.model('cart', cartSchema);
