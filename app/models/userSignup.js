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

  signUp: function (email, password, name, cb) {

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorMessage);

    }).then(function(){

    firebase.auth().onAuthStateChanged(function (user) {

      if (user) {

        var uid = user.uid;
        cb(uid);
        //greet the user
        // alert("Hey " + name + "Welcome to Life Plus!")
        console.log(user.uid);
        //add user id, username, email to database
        firebase.database().ref('users/' + uid).set({
          username: name,
          email: email,
          savedSearches: "[searchOne]",
        });

        // User is signed in.
      } else {
        console.log("Database User Creation Unsuccessfull")
      }
    });
    });
  },

  signIn: function (email, password, cb) {

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

          // cb(user)
          //add user id, username, email to database
          var uid = user.uid;
          cb(uid)


          // User is signed in.
        } else {
          console.log("Login Unsuccessfull")
        }
      });

    });

  },



getUserInfo: function(id, cb){
  console.log("user model requested");
  console.log(id);
  var userRef = firebase.database().ref().child('users/' +id);
  userRef.once('value', snap => {
  var result =  snap.val();

  console.log(result);
    // console.log(data);
  cb(result)
  });

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
