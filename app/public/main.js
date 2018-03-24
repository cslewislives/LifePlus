$(document).ready(function() {

    console.log("hello");

    $("#signUpBtn").click(
    function() {
        event.preventDefault();
        console.log("sign up clicked");
        let user = {
            email: $('#emailsu').val().trim(),
            password: $('#passwordsu').val().trim(),
            name: $('#namesu').val().trim()
        }
        console.log(user);

        $.post('/api/signUpUser', user).then(function() {
            console.log(user.name + ' Added');
        });
    });

    $("#signInBtn").click(function () {

      event.preventDefault();
      console.log("sign in clicked");
      let user = {
          email: $('#emailsi').val().trim(),
          password: $('#passwordsi').val().trim()

      }
      console.log(user);

      $.post('/api/signInUser', user).then(function(data) {
          console.log(user.email + 'sent to login');
          console.log(data);
      });

    });

    $('#searchButton').click(function() {
        event.preventDefault();
        console.log('Searching...');
        let newLife = {
            job: $('#orangeForm-job').val().trim(),
            location: $('#orangeForm-city').val().trim()
        }
        console.log(newLife);

        $.post('/api/searches', newLife).then(function() {
            console.log(newLife.job + ' added');
        })
    });


    $('#saveBtn').click(function(){
      console.log("clicked");
          let jobName = $("#jobName").text();
          let salary = $("#salary").text();
          let cityName = $("#cityName").text();
          let rent = $("#rent").text();


          let savedSearch = {
                job: jobName,
                location: cityName,
                salary: salary,
                rent: rent

            }

            console.log(savedSearch);
            $.post('/api/savedSearches', savedSearch);




    });



});
