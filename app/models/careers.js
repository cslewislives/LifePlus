

  // ------------------ //
 // -- Dependencies -- //
// ------------------ //

var request = require("request");
var keys = require("../config/keys.js");

var careerKey = keys.careers.career_token;

  // ------------------ //
 // ----- Globals ---- //
// ------------------ //

// Holds the career data from career one stop;
var career = "";

// user input from search
var jobTitle = "nurse";
var location = "denver,co";


  //   ------------------ // 
 //  -- API Requests -- //
// ------------------ //


 //  --Job Search -- //
// Take job title and convert to onetCode
function careerRequest(){


    //sets up request for converting job key word to Onetcode
    var options = {
        url : "https://api.careeronestop.org/v1/occupation/drou4l93dLi7TLw/" + jobTitle + "/Y/0/1",
        headers: {'Authorization' : 'Bearer ' + careerKey}
        };  

    request(options, function(error, response, body) {
        if (error){
            console.log(error);
          }
      // If the request is successful
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            console.log(result);
            var jobcode = result.OccupationList[0].OnetCode;
            console.log(jobcode);
            careerLocalData(jobcode);
      }
    });
}
// Takes the OnetCode from career
function careerLocalData(x){

    var options = {
        url : "https://api.careeronestop.org/v1/lmi/drou4l93dLi7TLw/" + x + "/" + location,
        headers: {'Authorization' : 'Bearer ' + careerKey}
        };  
        console.log(options.url);
    // This line is just to help us debug against the actual URL.

    request(options, function(error, response, body) {
        if (error){
            console.log(error);
          }
      // If the request is successful
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            console.log("Average Pay: $" + result.LMI.AveragePayState);
      }
    });
}

careerRequest();

 //  --Cost of Living Search -- //

function costs(){
    var options = {
        url : "https://www.numbeo.com/api/city_prices?api_key=ybyk9z0ag9439o&query=savannah"
        };  
    
    request(options, function(error, response, body) {
        if (error){
            console.log("Cost of living API is Broken");
          }
      // If the request is successful
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            // console.log(JSON.stringify(result,null,2));
            result.prices.forEach(element => {
                if (element.item_name === "Apartment (1 bedroom) in City Centre, Rent Per Month"){
                    console.log(element);
                }
            });
      }
    });

}
costs();