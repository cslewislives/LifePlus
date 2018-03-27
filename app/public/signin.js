$(document).ready(function () {
console.log("signin js");
  var anchor = $("#anchor").attr("value");
var config = {
    apiKey: "AIzaSyAsIRODKOn0XwK9WoN5jOtDYJ9P5hcW0eY",
    authDomain: "test-4cce2.firebaseapp.com",
    databaseURL: "https://test-4cce2.firebaseio.com",
    projectId: "test-4cce2",
    storageBucket: "test-4cce2.appspot.com",
  };

  firebase.initializeApp(config);

  //checks if a user is logged in
  //if user is already logged in, and they are on root page, redirects to search//
  //appends user id to the menu

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#currentUser").text(user.uid);
      console.log(user.uid);
    } else {
      $("#currentUser").text("please log in");
    }
    if(user && anchor !== "1"){
      window.location.href = "/search"
    }
  });


    //checks if a user is logged in
    //if user is already logged in, and they are on root page, redirects to search//
    //appends user id to the menu

    $("#signInBtn").click(function () {
            event.preventDefault();
            console.log("sign in clicked");

            var email = $('#emailsi').val().trim();
            var password = $('#passwordsi').val().trim();

            signInUser(email, password);

            // $.post('/api/signInUser', user).done(function(info){
            //   getUserInfo(info.user);
            //   console.log(info.user);
            //   console.log(currentUser);
            // })
        });

        $(".logout").click(function(){
          firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
            });
        });


        $("#signUpBtn").click(function () {
            event.preventDefault();
            console.log("sign up clicked");
            var email = $('#emailsu').val().trim();
            var password = $('#passwordsu').val().trim();
            var name = $('#namesu').val().trim();



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

            // signInUser(email, password);
        });



        function signInUser(email, password){
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
                  window.location.href = "/search"
                  // User is s  igned in.
                } else {
                  console.log("Login Unsuccessfull")
                }
              });



          });
        };

        $('#saveBtn').click(function () {
            console.log("clicked");
            let jobName = $("#jobName").text();
            let salary = $("#salary").text();
            let cityName = $("#cityName").text();
            let rent = $("#rent").text();
            let id = $("#currentUser").text();

            var userinfo = database.ref('users/' + id + '/savedSearches/');
            userInfo.push({
              "job": job,
              "location": location,
              "salary": salary,
              "rent": rent
            });
            userInfo.on('child_changed', function(data){
              console.log(data);

            });


        });
});
