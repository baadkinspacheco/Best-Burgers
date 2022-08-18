const express = require('express');
const router = express.Router();
const { MongoClient } = require("mongodb");
const nconf = require('nconf');
const jwt = require('jsonwebtoken');
const { userValidation } = require('../public/js/validation');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/register', async (req, res) => {
    try {
        // Validate data from user
        if(!userValidation(req.body)) {
            throw new Error("Data is invalid.");
        }

        // Connect to db
        const uri = nconf.get("mongodb");
        const client = new MongoClient(uri);
        await client.connect().then(console.log("Connected correctly to server"));

        // Hash password
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(req.body.password, salt);

        // Create a new user
        const newUser = {
            username: req.body.username,
            password: hash
        }

        // Check if the username already exists
        const checkUserExists = await client.db("TheBurgerDatabase").collection("Users").findOne({username: req.body.username});
        if (checkUserExists) { 
            throw new Error("User exists.");
        } 

        // Add user to the db
        const output = await client.db("TheBurgerDatabase").collection("Users").insertOne(newUser);
        
        //res.redirect('/login');
        res.json({
            status: true
        }); 
    } catch (err) {
        //res.redirect('/register');
        res.json({
            status: false
        }); 
    }
});

router.post('/login', async (req, res) => {
    try {
        // Validate data from user
        if(!userValidation(req.body)) {
            throw new Error("Data is invalid.");
        }

        // Connect to db
        const uri = nconf.get("mongodb");
        const client = new MongoClient(uri);
        await client.connect().then(console.log("Connected correctly to server"));

        // Check if the username exists
        const user = await client.db("TheBurgerDatabase").collection("Users").findOne({username: req.body.username});
        if (!user) { 
            throw new Error("User does not exist, please register.");
        } 

        // Check if the password exists
        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!isValidPassword) { 
            throw new Error("Incorrect password.");
        } 
        
        // Write to the cookie
        console.log(req.myCookie);
        req.myCookie.authenticated = true;
        req.myCookie.username = req.body.username;
        console.log(req.myCookie);
        res.json({
            status: true
        });
    } catch (err) {
        res.json({
            status: false,
            error: err.message
        });
    }
});

// clear the cookie and send back to login

module.exports = router;