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
            console.log("clicked");
            let user = {
                email: $('#orangeForm-email').val().trim(),
                password: $('#orangeForm-pass').val().trim(),
                name: $('#orangeForm-name').val().trim()
            }
            console.log(user);

            $.post('/api/users', user).then(function () {
                console.log(user.name + ' Added');
                window.location = '/search';
            });
        });

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
        jobSearch = newLife.job.replace(/\s+/g, "").toLowerCase();
        $.post('/search/' + jobSearch, newLife)
            .then(function (data1, data2) {
                console.log(data1);
                console.log(data2);
                let salary = parseFloat(data1.average);
                let rent = parseFloat(data2)
                $('#job-title').text(capitalizeFirstLetter(newLife.job));
                $('#location').text(newLife.location);
                $('#salary').text(salary.formatMoney(0));
                $('#rent').text(rent.formatMoney(0));
                console.log(newLife.job + ' added');
            }).fail(function (err) {
                console.log('you fail');
                console.log(err);
            });
    });

    function capitalizeFirstLetter(string) {

        return string.charAt(0).toUpperCase() + string.slice(1);
    }

});