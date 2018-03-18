
  // ------------------ //
 // -- Dependencies -- //
// ------------------ //

var firebase = require("firebase");

require('firebase/auth');
require('firebase/database');


  // --------------------------- //
 // -- Firebase Config & Init-- //
// --------------------------- //
var config = {
    apiKey: "AIzaSyAsIRODKOn0XwK9WoN5jOtDYJ9P5hcW0eY",
    authDomain: "test-4cce2.firebaseapp.com",
    databaseURL: "https://test-4cce2.firebaseio.com",
    projectId: "test-4cce2",
    storageBucket: "test-4cce2.appspot.com",
    messagingSenderId: "612604616018"
  };

  firebase.initializeApp(config);


  var database = firebase.database();
  var auth = firebase.auth();
  var app = auth.app;



  // ------------------ //
 // -- User Signup -- //
// ------------------ //


function signUp(email, password, name){

   
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage);

      });

      firebase.auth().onAuthStateChanged(function(user) {
    
        if (user) {
        //greet the user
        alert("Hey +" name + "Welcome to Life Plus!")

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

}

function signIn(email, password){

    //Takes Name and Email from DOM
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });

}

 
function sendToSearch(){

  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
    console.log(user.uid);

      }); 
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });

}
