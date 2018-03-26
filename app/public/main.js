$(document).ready(function () {

var currentUsr = function(id, username, email, savedSearches){

}


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

    $("#signUpBtn").click(function () {
        event.preventDefault();
        console.log("sign up clicked");
        let user = {
            email: $('#emailsu').val().trim(),
            password: $('#passwordsu').val().trim(),
            name: $('#namesu').val().trim()
        }
        console.log(user);

        $.post('/api/signUpUser', user).done(function(data) {
            console.log(user.name + ' Added');
            console.log("User Id: " + data.user);
            getUserInfo(data.user);
        });
    });



    $("#signInBtn").click(function () {
            event.preventDefault();
            console.log("sign in clicked");
            let user = {
                email: $('#emailsi').val().trim(),
                password: $('#passwordsi').val().trim()
                }

            $.post('/api/signInUser', user).done(function(info){
              getUserInfo(info.user);
              console.log(info.user);
              console.log(currentUser);
            })
        });


        function getUserInfo(id){
        $("#currentUser").html("<h4>User Id:" + id + "<h4>")
          let thisId = {
            id: id
          }
          $.post('/api/getUser', thisId).done(function(info) {
              console.log(info.info)
              currentUser = info.info;
          });
        };

    $('#searchBtn').click(function () {

        event.preventDefault();
        console.log('Searching...');
        $('#searchContent').toggleClass('d-block');
        let autocomplete = $('#orangeForm-city').val().trim()
        let location = autocomplete.replace(', USA', '');

        let newLife = {
            job: $('#orangeForm-job').val().trim(),
            location: location
        }
        console.log(newLife);

        post('/search/job', '/search/city', '/search/job-description', newLife);
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
        toastr["success"]("Search Saved!");
        $.post('/api/savedSearches', savedSearch);


    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function post(url1, url2, url3, data) {
        let jobPost = $.post(url1, data);
        let costsPost = $.post(url2, data);
        let descriptionPost = $.post(url3, data);

        $.when(jobPost, costsPost, descriptionPost).done(function (res1, res2, res3) {
            console.log(res1);
            console.log(res2);
            console.log(res3);
            let salary = parseFloat(res1[0].average);
            populateRent(res2[0]);
            populateUtilities(res2[0]);
            populateTransportation(res2[0]);
            populateGroceries(res2[0]);
            populateCareer(res3[0]);
            $('#jobName').text(capitalizeFirstLetter(data.job));
            $('#cityName').text(data.location);
            $('#salary').text(salary.formatMoney(0));
            console.log(data.job + ' added');;
        }).fail(function (err) {
            console.log('you fail');
            console.log(err);
        });
    }

    function populateRent(data) {
        let rentText = $('#rent-text');

        let description = 'Average rent per month for: ';
        rentText.html(description);

        $('#rent').text(data[21].average_price.formatMoney(0));
        data.forEach(element => {
            let averageRent = element.average_price.formatMoney(0);
            if (element.item_name.includes('Rent Per')) {
                rentText.append('<li>' + element.item_name.replace(', Rent Per Month', '') + ': ' + averageRent + '</li>');
            }
        });
    };

    function populateUtilities(data) {
        let utilText = $('#utilities');

        let description = 'Average Utilites per month: ';
        utilText.html(description);

        data.forEach(element => {
            let averagePay = element.average_price.formatMoney(0);
            switch (element.item_name) {
                case "Basic (Electricity, Heating, Cooling, Water, Garbage) for 85m2 Apartment, Utilities (Monthly)":
                    utilText.append('<li>' + element.item_name.replace('for 85m2 Apartment, Utilities (Monthly)', '') + ': ' + averagePay + '</li>');
                    break;

                case "Internet (60 Mbps or More, Unlimited Data, Cable/ADSL), Utilities (Monthly)":
                    utilText.append('<li>' + element.item_name.replace(', Utilities (Monthly)', '') + ': ' + averagePay + '</li>');
                    break;

            }
        });
    };

    function populateTransportation(data) {
        let transText = $('#transportation');

        let description = 'Average Transportation costs per month: ';
        transText.html(description);

        data.forEach(element => {
            let averageCost = element.average_price.formatMoney(0);
            if (element.item_name.includes('Transportation')) {
                transText.append('<li>' + element.item_name.replace(', Transportation', '') + ': ' + averageCost + '</li>');
            }
        });
    };

    function populateGroceries(data) {
        let groceryText = $('#groceries');

        let description = 'Average Costs for Groceries: ';
        groceryText.html(description);

        data.forEach(element => {
            let averageCost = element.average_price.formatMoney(0);
            if (element.item_name.includes('Markets')) {
                groceryText.append('<li>' + element.item_name.replace(', Markets', '') + ': ' + averageCost + '</li>');
            }
        });
    };

    function populateCareer(data) {
        let careerText = $('#career');
        let mainTitle = $('<h4>');
        mainTitle.html(data.Purpose.OnetTitle);
        careerText.html(mainTitle);
        careerText.append('<li>' + data.Purpose.OnetDesc + '</li>');
        careerText.append('<br>' + data.Activity);
    };

});
