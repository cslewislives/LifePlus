$(document).ready(function() {

    console.log("hello");

    $("#signUp").click(
    function() {
        event.preventDefault();
        console.log("sign up clicked");
        let user = {
            email: $('#orangeForm-email').val().trim(),
            password: $('#orangeForm-pass').val().trim(),
            name: $('#orangeForm-name').val().trim()
        }
        console.log(user);

        $.post('/api/signUpUser', user).then(function() {
            console.log(user.name + ' Added');
        });
    });

    $("#signIn").click(function () {

      event.preventDefault();
      console.log("sign in clicked");
      let user = {
          email: $('#orangeForm-email').val().trim(),
          password: $('#orangeForm-pass').val().trim()

      }
      console.log(user);

      $.post('/api/signInUser', user).then(function() {
          console.log(user.email + 'sent to login');
      });

    })

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
            toastr["success"]("Search Saved!");
            $.post('/api/savedSearches', savedSearch);




    });



});
