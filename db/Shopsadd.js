const mongoose = require('mongoose');

const ShopaddSchema = new mongoose.Schema({
    Name: {
        type: String,
        required:[ true , 'required name'],
    },

    location: {
        type: String,
        required: [true , 'required location'],
    },
    city: {
        type: String,
        required: [true, 'required city']
    },
    password: {
        type: String,
        required: [true , 'required password'],
    },
    image: {
       public_id:{
        type:String,
        required:true
       },
      url:{
        type:String,
        required:true
      },
      

    },
    
// image: [
//         {
//             data: Buffer,
//             contentType: {
//                 type: String,
//                 // You might want to change this default based on your requirements
//             },
//         },
//     ],
});

module.exports = mongoose.model("shops", ShopaddSchema);
