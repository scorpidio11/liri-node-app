require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();

var fs = require('fs');

// var arguments = process.argv.slice(2);
var userCommand = process.argv[2];
var secondCommand = process.argv[3];

// for(i=4; i<process.argv.length; i++){
//     secondCommand += '+' + process.argv[i];



// MOVIE
function movieCall() {


    // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = "";
    for (let i = 3; i < process.argv.length; i++) {
        movieName += " " + process.argv[i].trim();
    }


    var queryUrl = "http://www.omdbapi.com/?t=" + movieName.trim() + "&y=&plot=short&apikey=trilogy";

if(secondCommand === undefined) {
    console.log("\n========== Type your song or Try ==========\n");
    console.log("If you haven't watched Mr. Nobody, then you should: \nhttp://www.imdb.com/title/tt0485947/" + "\nIt's on Netflix! ");
    console.log("\n=============================================\n");

}

else{
    request(queryUrl, function (error, response, body) {
        console.log(queryUrl);
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
}


// Concert
function concertCall() {


    var artist = "";
    for (let i = 3; i < process.argv.length; i++) {
        artist += " " + process.argv[i].trim();
    }

    // Include the request npm package (run "npm install request" in this folder first!)
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist.trim() + "/events?app_id=codingbootcamp";

    // console.log(queryUrl);
    request(queryUrl, function (error, response, body) {

        
        var eventDate = JSON.parse(body)[0].datetime;
        var concertDate = moment(eventDate).format('MM/DD/YYYY')
        
      

        if (!error && response.statusCode === 200) {
            console.log("\n========== * Concert *  ==========\n");
       

            console.log
                ("Venue Name: " + JSON.parse(body)[0].venue.name
                + "\nVenue location: " + JSON.parse(body)[0].venue.city
                + "\nDate of the Event: " + concertDate

                );
            console.log("\n=================================\n");

        }
    });

}





//Sopitfy 

   
    function spotifySong() {

        var songName = '';
        for (let i = 3; i < process.argv.length; i++) {
            songName += " " + process.argv[i].trim();
        }
    
        if (secondCommand === undefined) {
            console.log("\n========== Type your song or Try ==========\n");
            console.log("Artist: Ace of Base" + "\nSong:The Sign ");
            console.log("\n=============================================\n");
        } else {
    
    
            //launch spotify search
            spotify.search({ type: 'track', query: songName }, function (err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                } else {
                    //tried searching for release year! Spotify doesn't return this!
                    console.log("\n========== * Spotify *  ==========\n");
                    console.log
                        ("Artist: " + data.tracks.items[0].artists[0].name
                        + "\nSong: " + data.tracks.items[0].name
                        + "\nAlbum: " + data.tracks.items[0].album.name
                        + "\nPreview Here: " + data.tracks.items[0].preview_url
                        );
                    console.log("\n=================================\n");
                }
            });
        };

    }

function call() {

    switch (userCommand) {
        case "movie-this":
            movieCall();
            break;
        case "concert-this":
            concertCall();
            break;

        case "spotify-this-song":
        spotifySong(secondCommand);
            break;

        // case 'do-what-it-says':
        // doWhat();
        // break;

        default:
            //Don't do anything
            break;
    }
}
call();



    // doWhat
    // function doWhat(){
    // 	// App functionality from file read / loads fs npm package
    // 	var fs = require("fs");

    // 	fs.readFile("random.txt", "utf-8", function(error, data) {
    // 		var command;
    // 		var query;

    // 		// If there is a comma, then we will split the string from file in order to differentiate between the command and query
    // 		// 	--> if there is no comma, then only the command is considered (my-tweets)
    // 		if(data.indexOf(",") !== -1) {
    // 			var dataArr = data.split(",");
    // 			command = dataArr[0];
    // 			query = dataArr[1];
    // 		} else {
    // 			command = data;
    // 		}

    // 		// After reading the command from the file, decides which app function to run
    // 		if(command === "concert-this") {
    //             concertCall();
    //          //} 
    //         //else if(command === "spotify-this-song") {
    // 			//spotifyThisSong(query);
    // 		} else if(command === "movie-this") {
    // 			movieThis(query);
    // 		} else { // Use case where the command is not recognized
    // 			console.log("Command from file is not a valid command! Please try again.")
    // 		}
    // 	});


    // }