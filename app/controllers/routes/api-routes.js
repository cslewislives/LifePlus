const express = require('express');
const router = express.Router();
const path = require('path');

const login = require('../../models/userSignup');
const search = require('../../models/lifeSearch');
const saveSearch = require('../../models/saveSearch');


router.get("/", function(req, res) {
    res.render("index");
  });

router.post('/api/signUpUser', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

      login.signUp(email, password, name);
      res.redirect('/search');

});


router.post('/api/signInUser', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    login.signIn(email, password);
    res.redirect('/search');

});



router.get('/search', (req, res) => {
    res.render('search');
});

router.post('/api/savedSearches', (req, res) => {
    let job = req.body.job,
     location = req.body.location,
     salary = req.body.salary,
     rent = req.body.rent;

     console.log(job + location + salary + rent + " sent to api routes");
     saveSearch.savethis(job, location, salary, rent);

});


router.get('/user-info', (req, res) => {
    res.render('userInfo');
});


module.exports = router;
