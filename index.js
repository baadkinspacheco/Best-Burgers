const express = require('express');
const app = express();
const path = require('path');
const { MongoClient } = require("mongodb");
const nconf = require('nconf');
const session = require('client-sessions');
const env = require('dotenv');
env.config();
const port = process.env.PORT || 3000;

// 'Hidden' file - Hides user and password in db uri
nconf.file({
    file: "config.json"
});

// Create a cookie
const sessionConfig = {
    cookieName: 'myCookie', // name of the cookie
    secret: nconf.get("secret"), // secret to activate cookie
    duration: 1000 * 60 * 60 * 8, // Cookie is good for 8 hour
    cookie: {
        ephemeral: false, // when false, cookie does not expire when browser closes
        secure: false, // for production set to true for https only access
        httpOnly: true // means no access in js
    }
};

// -------- Middleware ---------
app.use(session(sessionConfig)); 
app.use(express.static("public"));
app.use(express.json());

// Requests
app.use(require('./controller'));

app.use((req,res) => {
    res.status(404).send("I don't know what you are looking for :(");
    //res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Listen to the server
app.listen(port, () => {
    console.log('Server starting');
});