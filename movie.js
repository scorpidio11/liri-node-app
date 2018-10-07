require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
// var arguments = process.argv.slice(2);
var userCommand = process.argv[2];
//var secondCommand = process.argv[3];

// for(i=4; i<process.argv.length; i++){
//     secondCommand += '+' + process.argv[i];



    function call() {
 
        switch (userCommand) {
            case "movie-this":
                movieCall();
                break;
                case "concert-this":
                concertCall();
                break;
            // case "withdraw":
            //     WithDraw(amount);
            //     break;
            // case "lotto":
            //     Lotto();
            //     break;
            default:
                //Don't do anything
                break;
        }
        }
        
        call();




function movieCall(){

   
    // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = '';
    for(let i = 3; i < process.argv.length; i++){
        movieName += " " + process.argv[i].trim();
    }

// Include the request npm package (run "npm install request" in this folder first!)
var queryUrl = "http://www.omdbapi.com/?t=" + movieName.trim()+ "&y=&plot=short&apikey=trilogy";


request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log("\n========== * Movie *  ==========\n");
        console.log
            ("Movie Title: " + JSON.parse(body).Title
            + "\nRelease Year: " + JSON.parse(body).Year
            + "\nIMBDRating: " + JSON.parse(body).imdbRating
            + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value
            + "\nCountry: " + JSON.parse(body).Country
            + "\nLanguage: " + JSON.parse(body).Language
            + "\nPlot: " + JSON.parse(body).Plot
            + "\nActors: " + JSON.parse(body).Actors);
        console.log("\n=================================\n");

    }
});

}



// function movieCall(){


//     var movieName = '';
//     for(let i = 3; i < process.argv.length; i++){
//         movieName += " " + process.argv[i].trim();
//     }

// // Include the request npm package (run "npm install request" in this folder first!)
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName.trim()+ "&y=&plot=short&apikey=trilogy";


// request(queryUrl, function (error, response, body) {

//     if (!error && response.statusCode === 200) {
//         console.log("\n========== * Movie *  ==========\n");
//         console.log
//             ("Movie Title: " + JSON.parse(body).Title
//             + "\nRelease Year: " + JSON.parse(body).Year
//             + "\nIMBDRating: " + JSON.parse(body).imdbRating
//             + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value
//             + "\nCountry: " + JSON.parse(body).Country
//             + "\nLanguage: " + JSON.parse(body).Language
//             + "\nPlot: " + JSON.parse(body).Plot
//             + "\nActors: " + JSON.parse(body).Actors);
//         console.log("\n=================================\n");

//     }
// });

// }


