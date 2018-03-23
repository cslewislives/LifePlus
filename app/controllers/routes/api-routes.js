const express = require('express');
const router = express.Router();
const path = require('path');
const firebase = require('firebase');

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

    res.end();
});

router.get('/search', (req, res) => {
    res.render('search');
});

router.post('/search/:job?', (req, res) => {
    let jobSearch = req.params.job;
    let job = req.body.job,
     location = req.body.location;
    console.log('got here', jobSearch, req.body);
     if (jobSearch) {
         console.log('here2')
         search.careerRequest(job, location, function(result) {
            console.log('here3')
             res.json({
                average: result.LMI.AveragePayState
            });
         })
        search.costs(location, function(result) {
                 console.log('got to costs');
                 res.json(result)
             });
        //  res.end();
     } else {
         res.render('search');
     }

})

router.get('/user-info', (req, res) => {
    res.render('userInfo');
});


module.exports = router;