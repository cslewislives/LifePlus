// ------------------ //
// -- Dependencies -- //
// ------------------ //

var firebase = require("firebase");

require('firebase/auth');
require('firebase/database');

var database = firebase.database();
var auth = firebase.auth();
var app = auth.app;



// ------------------ //
// -- User Signup -- //
// ------------------ //
var login = {

  signUp: function (email, password, name) {

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorMessage);

    });

    firebase.auth().onAuthStateChanged(function (user) {

      if (user) {
        //greet the user
        // alert("Hey " + name + "Welcome to Life Plus!")

        console.log(user.uid);

        //add user id, username, email to database
        firebase.database().ref('users/' + user.uid).set({
          username: name,
          email: email
        });
        // User is signed in.
      } else {
        console.log("Database User Creation Unsuccessfull")
      }
    });

  },

  signIn: function (email, password) {

    //Takes Name and Email from DOM
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    }).then(function(){
      firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
          //greet the user
          // alert("Hey " + name + "Welcome to Life Plus!")

          console.log(user.uid + "is logged in");

          //add user id, username, email to database
          var uid = user.uid;

          return uid;
          // User is signed in.
        } else {
          console.log("Login Unsuccessfull")
        }
      });

    });

    console.log(user);
    console.log(uid);


  },





  sendToSearch: function () {

    firebase.auth().onAuthStateChanged(function (user) {

      if (user) {
        console.log(user.uid);

      }
      // User is signed in.
      else {
        // No user is signed in.
      }
    });
  }

}

module.exports = login;
