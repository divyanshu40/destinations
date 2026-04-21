const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { destinationModel } = require("./models/destination.model");
const { initializeDatabase } = require("./db/db.connect");
const app = express();
const PORT = 3000;
const uri = process.env.MONGODB;
app.use(cors())
app.use(express.json());

// Connecting application to the database
initializeDatabase(uri).then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
});

// function to add new destination to the database
async function addNewDestination (destinationData) {
    let addedDestination = await new destinationModel(destinationData).save();
    return addedDestination;
}

// function to add mulitple destinations to the database
async function addMultipleDestinations(destinationsData) {
    let addedDestinations = await destinationModel.insertMany(destinationsData);
    return destinationsData;
}

// function to get destinations from the database
async function getAllDestinations() {
    let destinations = await destinationModel.find();
    return destinations;
}

// function to get a destination by id from database
async function getDestinationById(destinationId) {
    let destination = await destinationModel.findById(destinationId);
    if (! destination) {
        return null
    }
    return destination;
}

// POST Route to add new destination to the database
app.post("/destination/new", async (req, res) => {
    let destinationData = req.body;
    try {
        let response = await addNewDestination(destinationData);
        return res.status(201).json(response);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// POST route to add multiple destinations to the database
app.post("/destinations/new", async (req, res) => {
    let destinationsData = req.body;
    try {
        let response = await addMultipleDestinations(destinationsData);
        return res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to get all destinations from the database
app.get("/destinations", async (req, res) => {
    try {
        let response = await getAllDestinations();
        if (response.length === 0) {
            return res.status(404).json({ message: "Destinations not found"});
        }
        return res.status(200).json(response);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to get destination by ID from database
app.get("/destination/details/:id", async (req, res) => {
    let destinationId = req.params.id;
    try {
        let response = await getDestinationById(destinationId);
        if (response === null) {
            return res.status(404).json({ message: "Destination not found" });
        }
        return res.status(200).json(response);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});