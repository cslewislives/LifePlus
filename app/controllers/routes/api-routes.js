const express = require('express');
const router = express.Router();
const path = require('path');

var login = require('../../models/userSignup');

router.get("/", function(req, res) {
    res.render("index");
  });

router.post('/api/users', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    login.signUp(email, password, name);
    res.end();
});

router.get('/:jobTitle', (req, res) => {
    let job = req.params.jobTitle;
    
});


module.exports = router;