const express = require('express');
const { ServerApiVersion } = require('mongodb');

const router = express.Router();

// Page routes
router.use('/home',  require('./pages/home'));
router.use('/add', require('./pages/add'));
router.use('/edit', require('./pages/edit'));
router.use('/remove', require('./pages/remove'));
router.use('/register',  require('./pages/register'));
router.use('/login',  require('./pages/login'));

// Api routes
router.use('/api/burgers',  require('./apis/burgers'));
router.use('/auth', require('./auth/auth-routes'));

module.exports = router;