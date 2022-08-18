const express = require('express');
const path = require('path');

// Router object that will handle post requests
const router = express.Router();

router.get('/', (req, res) => {
    //res.sendFile(`/Projects/burger-project/public/register.html`);
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

module.exports = router;