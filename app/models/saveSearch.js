
var firebase = require("firebase");

require('firebase/auth');
require('firebase/database');

var database = firebase.database();
var auth = firebase.auth();
var app = auth.app;
var user = firebase.auth().currentUser;

var save = {

  savethis: function(job, location, salary, rent, id){
        console.log("saveSearch.js: "
         + job + location + salary + rent);

      console.log("saving user search" + id);


          if (id) {
            var userInfo = firebase.database().ref('users/' + id + '/savedSearches/');
            userInfo.push({
              "job": job,
              "location": location,
              "salary": salary,
              "rent": rent
            });
          } else {
            console.log("No user is signed in.");

            }



    }


};
module.exports = save
