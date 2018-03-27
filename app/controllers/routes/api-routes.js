const express = require('express');
const router = express.Router();
const path = require('path');
const firebase = require('firebase');

const login = require('../../models/userSignup');
const search = require('../../models/lifeSearch');
const saveSearch = require('../../models/saveSearch');


router.get("/", function (req, res) {
    res.render("index");
});

router.post('/api/signUpUser', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    login.signUp(email, password, name, function (uid) {
        console.log(uid);
        res.json({
            user: uid
        });

    });

});

router.post('/api/signInUser', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;


    login.signIn(email, password, function (uid) {
        //let thisUser = login.getUser();
        console.log(uid);

        res.json({
            user: uid
        });

    });
});

router.post('/api/getUser', (req, res, next) => {
    let id = req.body.id;
    console.log("user info requested for" + id);
    login.getUserInfo(id, function (info) {
        res.json({
            info
        });
    });

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

router.post('/search/job', (req, res) => {
    let job = req.body.job,
        location = req.body.location;
    console.log('got here', req.body);
    search.careerRequest(job, location, function (result) {
        console.log('inside career request');
        console.log(result)
        res.json({
            average: result.LMI.AveragePayState
        });
    })
})

router.post('/search/city', (req, res) => {
    let job = req.body.job,
        location = req.body.location;

    console.log('got here', req.body);

    search.costs(location, function (result) {
        console.log('got to costs');
        res.json(result)
    });
})

router.post('/search/job-description', (req, res) => {
    let job = req.body.job,
        location = req.body.location;

    console.log('got here', req.body);

    search.getCode(job, location, function (result) {
        console.log('got to description');
        res.json(result)
    });
})

router.get('/user-info', (req, res) => {
    res.render('userInfo');
});


module.exports = router;