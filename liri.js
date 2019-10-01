// Declared golbal variables//
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
const chalk = require('chalk');
var chalkRed = chalk.yellow.bold.bgBlack.underline
var chalkGreen = chalk.yellow.bold.bgBlack
var chalkBlack = chalk.redBright.bold.bgBlack
var command = process.argv[2];
var value = process.argv.slice(3).join(" ");

// spotify function that returns default value if left blank//
function spotifyThis(){
    // if vaule equals empty string ""//
    if(value === ""){
        // assign value to 'the sign' //
        value = "The Sign Ace of Base";
        spotifyThisValue();
        // else run function w/ user inputed vaule//
    }else{
        spotifyThisValue();
    }
}


// spotify function that take value from userInput //
function spotifyThisValue(input) {
    // ajax call req to spotify//
    spotify
        .search({
            type: 'track',
            query: value,
            limit: 5
        })

        // response function for looped response results//
        .then(function (resp) {
            var data = resp.tracks.items
            for (let x = 0; x < data.length; x++) {                              
                // logged results to console//
                console.log("___________________________");
                console.log("");
                console.log("Artist Name: " + chalkBlack(data[x].artists[0].name));
                console.log("Song Title: " + chalkGreen(data[x].name));
                console.log("Preview link: " + chalkBlack(data[x].preview_url));
                console.log("Album Title: " + chalkGreen(data[x].album.name));
            }
                console.log("___________________________");
        })
        .catch(function (err) {
            console.log(err);
        });

}
// concert results function//
function concertThis() {

    // ajax req to bandsintown.com //
    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
        axios.get(queryUrl).then(

            // looped thru response and logged results//
        function (resp) {
            var data = resp.data;                    
            for (let i = 0; i < data.length; i++) {
                console.log(chalkRed('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'));
                console.log("");
                console.log("Band/Artist: " + chalkRed(data[i].lineup));
                console.log("Venue: " + chalkBlack(data[i].venue.name));
                console.log("Location: " + chalkRed(data[i].venue.city + ", " + data[i].venue.region));
                console.log("Date of Event: " + chalkBlack(moment(data[i].datetime).format("LLL")));
                console.log("");
            }
            console.log(chalkRed("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"))
        }

    )
}
// OMDB function that returns default value if left blank//
function movieThis(){
    if(value === ""){
        value = "Mr Nobody";
        movieThisValue();
    }else{
        movieThisValue();
    }
}
// OMDB function that take value from userInput //
function movieThisValue() {
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
// ajax call req to OMDB then console log the results//
    axios.get(queryUrl).then(
        function (resp) {
            console.log("---------------------------------");
            console.log("The movie's Title: " + chalkGreen(resp.data.Title));
            console.log("The movie's was released in: " + chalkBlack(resp.data.Year));
            console.log("The movie's rating is: " + chalkGreen(resp.data.imdbRating));
            console.log("The movie's Rotten Tomatoes rating is: " + chalkBlack(resp.data.Ratings[1].Value));
            console.log("The movie's was produced in: " + chalkGreen(resp.data.Country));
            console.log("The movie's language(s): " + chalkBlack(resp.data.Language));
            console.log("The movie's Plot: " + chalkGreen(resp.data.Plot));
            console.log("The movie's Actors: " + chalkBlack(resp.data.Actors));
            console.log("---------------------------------");
        }
    );
}
// fucntion the pulls the command and value from a txt file //
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(", ");      
        command = dataArr[0];
        value = dataArr[1];      
        whatItSays();
      })
      
}
// function that handles the commands of app functions//
function whatItSays(){
    switch (command) {
        case "spotify-this-song":
            spotifyThis();
            break;
        case "concert-this":
            concertThis();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}whatItSays();
// function that appends user inputed value in to log.txt file //
fs.appendFile("log.txt", value + ', ', function (err) {
    if (err) {
        console.log(err);

    } else {
        console.log("Info added");

    }
})