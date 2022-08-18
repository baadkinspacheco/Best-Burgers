const express = require('express');
const path = require('path');

// Router object that will handle post requests
const router = express.Router();
const nconf = require('nconf');

// Render add.html file
router.get('/', (req, res) => {
    try {
        if (!req.myCookie.authenticated) return res.redirect('/login');
        console.log(req.myCookie);
        //res.sendFile(`/Projects/burger-project/public/add.html`);
        res.sendFile(path.join(__dirname, '../public/add.html'));
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;