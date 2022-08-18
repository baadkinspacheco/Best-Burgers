const express = require('express');
const path = require('path');

// Router object that will handle post requests
const router = express.Router();

router.get('/', (req, res) => {
    try {
        if (!req.myCookie.authenticated) return res.redirect('/login');
        //res.sendFile(`/Projects/burger-project/public/remove.html`);
        res.sendFile(path.join(__dirname, '../public/remove.html'));
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;