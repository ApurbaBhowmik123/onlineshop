// const mongoose = require('mongoose');
// mongoose.connect("mongodb+srv://bhowmikapurba9:TUhnt8hSbTrb03BO@cluster0.ky8tied.mongodb.net/ourshop"); 

const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
        .connect('mongodb+srv://gnoindeveloper:glofaa1234@cluster0.m55jsrs.mongodb.net/ourshop', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        });
};

module.exports = connectDatabase;