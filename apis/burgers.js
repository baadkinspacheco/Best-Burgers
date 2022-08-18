const express = require('express');
const router = express.Router();
const { MongoClient } = require("mongodb");
const nconf = require('nconf');

// Gets all of the existing burgers from the database ---- /api/burgers/all
router.get('/all', async (req,res) => {
    try {
        // Throw an error if the cookie is not authenticated 
        if (!req.myCookie.authenticated) throw new Error("Invalid credentials");
        // Get the uri for the db
        const uri = nconf.get("mongodb");
        // Create a new mongodb client
        const client = new MongoClient(uri);
        // Connect to the server
        await client.connect().then(console.log("Connected correctly to server"));
        // Get all of the burgers in the burgers collection 
        const allBurgers = await client.db("TheBurgerDatabase").collection("Burgers").find({username: req.myCookie.username}).toArray();
        // Send json objects to the client
        res.json(allBurgers);
    } catch(err) {
        res.json({ 
            message: err.message,
            status: false
        });
    }
});

// Adds a new burger document to the collection ---- /api/burgers/add
router.post('/add', async (req,res) => {                                                                                                                         
    try {
        // Throw an error if the cookie is not authenticated 
        if (!req.myCookie.authenticated) throw new Error("Invalid credentials");
        // Get the uri for the db
        const uri = nconf.get("mongodb");
        // Create a new mongodb client
        const client = new MongoClient(uri);
        // Connect to database
        await client.connect().then(console.log("Connected correctly to server"));
        // Create burger object
        const newBurger = {
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            description: req.body.description,
            ingredients: req.body.ingredients,
            postal: req.body.postal,
            restaurant: req.body.restaurant,
            state: req.body.state,
            web: req.body.web,
            username: req.myCookie.username
        };
        // Check if the burger already exists
        const checkBurgerExists = await client.db("TheBurgerDatabase").collection("Burgers").findOne({name: req.body.name});
        if (checkBurgerExists) { 
            console.log(checkBurgerExists);
            console.log("The burger and restaurant already exist in the collection.");
        } else {
            console.log("The burger can be added to the database!");
            // Add burger object to the database
            const result = await client.db("TheBurgerDatabase").collection("Burgers").insertOne(newBurger);
            // Sends message to console and the user 
            console.log(result);
            res.json({status: true});
        }
    } catch (err) {
        res.json({ 
            message: err.message,
            status: false
        });
    }
});

// Updates an existing burger in the collection ---- /api/burgers/edit
router.put('/edit', async (req,res) => {
    try {
        // Throw an error if the cookie is not authenticated 
        if (!req.myCookie.authenticated) throw new Error("Invalid credentials");
        // Get the uri for the db
        const uri = nconf.get("mongodb");
        // Create a new mongodb client
        const client = new MongoClient(uri);
        // Connect to the db
        await client.connect().then(console.log("Connected correctly to server"));
        // Create a burger object
        const editBurger = {
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            description: req.body.description,
            ingredients: req.body.ingredients,
            postal: req.body.postal,
            restaurant: req.body.restaurant,
            state: req.body.state,
            web: req.body.web
        };
        // Update the burger in the db
        const result = await client.db("TheBurgerDatabase").collection("Burgers").updateOne({name: req.body.name}, { $set: editBurger}, {upsert: true});
        res.json({status: true});
    } catch (err) {
        res.json({ 
            message: err.message,
            status: false
        });
    }
});

// Remove burger from the collection ---- /api/burgers/remove
router.delete('/remove', async (req,res) => {
    try {
        // Throw an error if the cookie is not authenticated 
        if (!req.myCookie.authenticated) throw new Error("Invalid credentials");
        // Get the uri for the db
        const uri = nconf.get("mongodb");
        // Create a new mongodb client
        const client = new MongoClient(uri);
        // Connect to the db
        await client.connect().then(console.log("Connected correctly to server"));
        // Deletes burger from the db
        const result = await client.db("TheBurgerDatabase").collection("Burgers").deleteOne({name: req.body.name});
        res.json({status: true});
    } catch (err) {
        res.json({ 
            message: err.message,
            status: false
        });
    }
});

module.exports = router;