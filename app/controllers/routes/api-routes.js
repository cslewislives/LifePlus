const express = require('express');
const router = express.Router();
const path = require('path');

var login = require('../../models/userSignup');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/login-page.html"));
})

module.exports = router;