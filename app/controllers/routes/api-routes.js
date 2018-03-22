const express = require('express');
const router = express.Router();
const path = require('path');

const login = require('../../models/userSignup');
const search = require('../../models/lifeSearch');

router.get("/", function(req, res) {
    res.render("index");
  });

router.post('/api/users', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    login.signUp(email, password, name);
    res.redirect('/search');
});

router.get('/search', (req, res) => {
    res.render('search');
});

router.post('/api/searches', (req, res) => {
    let job = req.body.job,
     location = req.body.location;

    search.careerRequest(job, location);
    search.costs(location);
    res.end();

})

router.get('/user-info', (req, res) => {
    res.render('userInfo');
});


module.exports = router;