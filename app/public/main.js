$(document).ready(function() { 
    
    console.log("hello");

    $("#signUp").click(
    function() {
        event.preventDefault();
        console.log("clicked");
        let user = {
            email: $('#orangeForm-email').val().trim(),
            password: $('#orangeForm-pass').val().trim(),
            name: $('#orangeForm-name').val().trim()
        }
        console.log(user);

        $.post('/api/users', user).then(function() {
            console.log(user.name + ' Added');
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
    })


});