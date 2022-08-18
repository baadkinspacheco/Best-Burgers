const express = require('express');
const path = require('path');

// Router object that will handle post requests
const router = express.Router();

router.get('/', (req, res) => {
    // clear the cookies
    req.myCookie.reset();

    //res.sendFile(`/Projects/burger-project/public/login.html`);
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

module.exports = router;