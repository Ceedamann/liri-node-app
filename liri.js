require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
const chalk = require('chalk');
var chalkRed = chalk.yellow.bold.bgBlack.underline
var chalkBlack = chalk.redBright.bold.bgBlack
var command = process.argv[2];
var value = process.argv.slice(3).join(" ");

function spotifyThis(input) {
    spotify
        .search({
            type: 'track',
            query: value,
            limit: 5
        })
        .then(function (resp) {
            var data = resp.tracks.items
            for (let x = 0; x < data.length; x++) {
                console.log("___________________________");
                console.log("");
                console.log("Artist Name: " + chalkBlack(data[x].artists[0].name));
                console.log("Song Title: " + chalkRed(data[x].name));
                console.log("Preview link: " + chalkBlack(data[x].preview_url));
                console.log("Album Title: " + chalkRed(data[x].album.name));
               
                
            }
            console.log("___________________________");
        })
        .catch(function (err) {
            console.log(err);
        });

}

function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
        axios.get(queryUrl).then(
        function (resp) {
            var data = resp.data
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

function movieThis() {
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (resp) {
            console.log("---------------------------------");
            console.log("The movie's Title: " + chalkRed(resp.data.Title));
            console.log("The movie's was released in: " + chalkBlack(resp.data.Year));
            console.log("The movie's rating is: " + chalkRed(resp.data.imdbRating));
            console.log("The movie's Rotten Tomatoes rating is: " + chalkBlack(resp.data.Ratings[1].Value));
            console.log("The movie's was produced in: " + chalkRed(resp.data.Country));
            console.log("The movie's language(s): " + chalkBlack(resp.data.Language));
            console.log("The movie's Plot: " + chalkRed(resp.data.Plot));
            console.log("The movie's Actors: " + chalkBlack(resp.data.Actors));
            console.log("---------------------------------");
        }
    );
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(", ");
      
        command = dataArr[0];
        value = dataArr[1];

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        whatItSays();
      })
      
}
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

fs.appendFile("log.txt", value + ', ', function (err) {
    if (err) {
        console.log(err);

    } else {
        console.log("Info added");

    }
})