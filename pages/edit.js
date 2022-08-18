const express = require('express');
const path = require('path');

// Router object that will handle post requests
const router = express.Router();

router.get('/', (req, res) => {
    try {
        if (!req.myCookie.authenticated) return res.redirect('/login');
        console.log(req.myCookie);
        //res.sendFile(`/Projects/burger-project/public/edit.html`);
        res.sendFile(path.join(__dirname, '../public/edit.html'));
    } catch (err) {
        console.log(err);
    }

});

module.exports = router;

