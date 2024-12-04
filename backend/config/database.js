const mongoose = require("mongoose");



const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, { 
    })
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error.message);
            process.exit(1); // Exit the process with failure
        });
}

module.exports = connectDatabase;
