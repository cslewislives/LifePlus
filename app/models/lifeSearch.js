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
            if (error) {
                console.log(error);
            }
            // If the request is successful
            else if (!error && response.statusCode === 200) {
                var result = JSON.parse(body);
                var jobCode = result.OccupationList[0].OnetCode;
                search.careerLocalData(jobCode, location, cb);
            } 
        });
    },
    getCode: function (jobTitle, location, cb) {
        var options = {
            url: "https://api.careeronestop.org/v1/occupation/drou4l93dLi7TLw/" + jobTitle + "/Y/0/1",
            headers: {
                'Authorization': 'Bearer ' + careerKey
            }
        };
        
        console.log('here5', options.url)
        request(options, function (error, response, body) {
            console.log('body', body)
            if (error) {
                console.log(error);
            }
            // If the request is successful
            else if (!error && response.statusCode === 200) {
                var result = JSON.parse(body);
                // console.log(result);
                var jobCode = result.OccupationList[0].OnetCode;
                console.log('this is the getCode: ' + jobCode);
                search.careerDescription(jobCode, location, cb);
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
                cb(result);
            }
        });
    },
    careerDescription: function (jobCode, location, cb) {
        let getState = location.split(', ');
        console.log(getState);
        let state = getState[1];
        var options = {
            url: "https://api.careeronestop.org/v1/jdw/drou4l93dLi7TLw/" + jobCode + "/" + state + "/0",
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
                // console.log(result);
                cb(result);
            }
        });
    },
    costs: function(location, cb) {
        var options = {
            url : "https://www.numbeo.com/api/city_prices?api_key=ybyk9z0ag9439o&country=United_States&currency=USD&query=" + location
            };

        request(options, function(error, response, body) {
            if (error){
                console.log("Cost of living API is Broken");
              }
          // If the request is successful
            else if (!error && response.statusCode === 200) {
                var result = JSON.parse(body);
                var sendBack = result.prices;
                // console.log(sendBack);
                // console.log(JSON.stringify(result,null,2));
                cb(sendBack);
                // result.prices.forEach(element => {
                //     if (element.item_name === "Apartment (1 bedroom) in City Centre, Rent Per Month"){
                //         console.log(element);
                //     }
                // });
          }
        });
    }
};



module.exports = search;
