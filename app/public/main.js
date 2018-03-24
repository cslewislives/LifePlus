$(document).ready(function () {

    Number.prototype.formatMoney = function (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + '$' + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    console.log("hello");

    $("#signUp").click(
        function () {
            event.preventDefault();
            console.log("sign up clicked");
            let user = {
                email: $('#orangeForm-email').val().trim(),
                password: $('#orangeForm-pass').val().trim(),
                name: $('#orangeForm-name').val().trim()
            }
            console.log(user);

            $.post('/api/signUpUser', user).then(function () {
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

        $.post('/api/signInUser', user).then(function () {
            console.log(user.email + 'sent to login');
        });

    })

    $('#searchButton').click(function () {
        event.preventDefault();
        console.log('Searching...');
        let autocomplete = $('#orangeForm-city').val().trim()
        let location = autocomplete.replace(', USA', '');
        let newLife = {
            job: $('#orangeForm-job').val().trim(),
            location: location
        }
        console.log(newLife);
        post('/search/job', '/search/city', newLife);
    });

    $('#saveBtn').click(function () {
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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function post(url1, url2, data) {
        let post1 = $.post(url1, data);
        let post2 = $.post(url2, data);

        $.when(post1, post2).done(function (res1, res2) {
            console.log(res1);
            console.log(res2);
            let salary = parseFloat(res1[0].average);
            let rent = parseFloat(res2[0].average_price);
            $('#job-title').text(capitalizeFirstLetter(data.job));
            $('#location').text(data.location);
            $('#salary').text(salary.formatMoney(0));
            $('#rent').text(rent.formatMoney(0));
            console.log(data.job + ' added');
        }).fail(function (err) {
            console.log('you fail');
            console.log(err);
        });
    }
});