const request = require('request');
const keys = require("../config/keys.js");

const careerKey = keys.careers.career_token;

var search = {
    careerRequest: function (jobTitle, location, cb) {
        var options = {
            url: "https://api.careeronestop.org/v1/occupation/drou4l93dLi7TLw/" + jobTitle + "/Y/0/1",
            headers: {
                'Authorization': 'Bearer ' + careerKey
            }
        };
        console.log('here4', options.url)
        request(options, function (error, response, body) {
            console.log('body', body)
            if (error) {
                console.log(error);
            }
            // If the request is successful
            else if (!error && response.statusCode === 200) {
                var result = JSON.parse(body);
                console.log(result);
                var jobCode = result.OccupationList[0].OnetCode;
                console.log(jobCode);
                search.careerLocalData(jobCode, location, cb);
            } 
        });
    },
    careerLocalData: function (jobCode, location, cb) {
        var options = {
            url: "https://api.careeronestop.org/v1/lmi/drou4l93dLi7TLw/" + jobCode + "/" + location,
            headers: {
                'Authorization': 'Bearer ' + careerKey
            }
        };
        console.log(options.url);
        // This line is just to help us debug against the actual URL.

        request(options, function (error, response, body) {
            if (error) {
                console.log(error);
            }
            // If the request is successful
            else if (!error && response.statusCode === 200) {
                var result = JSON.parse(body);
                console.log("Average Pay: $" + result.LMI.AveragePayState);
                cb(result);
            }
        });
    },
    costs: function(location, cb) {
        var options = {
            url : "https://www.numbeo.com/api/city_prices?api_key=ybyk9z0ag9439o&query=" + location
            };  
        
        request(options, function(error, response, body) {
            if (error){
                console.log("Cost of living API is Broken");
              }
          // If the request is successful
            else if (!error && response.statusCode === 200) {
                var result = JSON.parse(body);
                // console.log(JSON.stringify(result,null,2));
                result.prices.forEach(element => {
                    if (element.item_name === "Apartment (1 bedroom) in City Centre, Rent Per Month"){
                        console.log(element);
                        cb(element);
                        // return element;
                    }
                });
          }
        });
    }
};

module.exports = search;