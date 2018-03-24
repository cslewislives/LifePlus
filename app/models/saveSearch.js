
var firebase = require("firebase");

require('firebase/auth');
require('firebase/database');

var database = firebase.database();
var auth = firebase.auth();
var app = auth.app;
var user = firebase.auth().currentUser;

var save = {

  savethis: function(job, location, salary, rent){
        console.log("saveSearch.js: "
         + job + location + salary + rent);
    firebase.auth().onAuthStateChanged(function (user) {
      console.log("saving user search" + user);


          if (user) {
            var userInfo = firebase.database().ref('users/' + user.uid + '/savedSearches/');
            userInfo.push({
              "job": job,
              "location": location,
              "salary": salary,
              "rent": rent
            });
            userInfo.on('child_changed', function(data){
              console.log(data);
            });


          } else {
            console.log("No user is signed in.");
            }

      });

    }
};
module.exports = save
