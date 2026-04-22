const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    name: {
        type: String
    },
    rating: {
        type: Number
    },
    visitors: {
        type: Number
    },
    attractions: {
        type: [String]
    },
    description: {
        type: String
    }
});

const destinationModel = mongoose.model("destination", destinationSchema);

module.exports = { destinationModel };