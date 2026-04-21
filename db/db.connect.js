const mongoose = require("mongoose");



const initializeDatabase = async (uri) => {
    console.log(uri);
    try {
        await mongoose.connect(uri);
        console.log("Connected to the database");
    } catch(error) {
        console.log(error);
    }
}

module.exports = { initializeDatabase };