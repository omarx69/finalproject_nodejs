const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb+srv://<username>:<password>@cluster0.qlj1kug.mongodb.net/wishlistDB?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Connection is successful");
    })
    .catch((error) => {
        console.error("Connection failed:", error.message);
    });

}

module.exports=connectDB;

