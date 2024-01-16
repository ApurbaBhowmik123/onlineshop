const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    Name: String,
    // id:String,
    location: String,
    city: String,
    password:String,
    image:{type: String} 
    // image: [
    //     {
    //         data: Buffer,
    //         contentType: {
    //            type: String
    //             // You might want to change this default based on your requirements
    //         },
    //     },
    // ],
});

module.exports = mongoose.model("shop", ShopSchema);