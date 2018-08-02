require("dotenv").config();

var twitter_keys = require("./keys.js");
var spotify_keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var command = process.argv[2];
var argument = process.argv[3];



function runCommand(command, argument) {

	if (command === 'my-tweets') {

		var client = new Twitter (twitter_keys.twitter);
		
		var params = {
			screen_name: 'user-name-goes-here'
		};
		client.get('statuses/user_timeline', params, function (error, tweets) {
			if (!error) {
				console.log("Tweets")
				tweets.forEach((tweets) => {
					console.log(tweets.created_at),
					console.log(tweets.text)
				})
			}
		});
	} else if (command === 'spotify-this-song') {
		
		var spotify = new Spotify (spotify_keys.spotify);

		spotify.search({
			type: 'track',
			query: argument
		}, function (err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			var artist = data.tracks.items[0].artists[0].name;
			var songName = data.tracks.items[0].name;
			var previewUrl = data.tracks.items[0].external_urls.spotify;
			var albumName = data.tracks.items[0].album.name;

			console.log("Artist: " + artist);
			console.log("Song Name: " + songName);
			console.log("Preview URL: " + previewUrl);
			console.log("Album Name: " + albumName);
		});

	} else if (command === 'movie-this') {

		var queryUrl = "http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=36ab58fc";

		request(queryUrl, function (error, response, body) {

			if (!error && response.statusCode === 200) {

				console.log("Title: " + JSON.parse(body).Title);
				console.log("Year: " + JSON.parse(body).Year);
				console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
				console.log("Rotten Tomatos Rating: " + JSON.parse(body).Ratings[1].Value);
				console.log("Country: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: ", JSON.parse(body).Plot);
				console.log("Actors: ", JSON.parse(body).Actors);

			}
		});
	}else if (command === 'song-title-here') {
	fs.readFile("random.txt", "utf-8", function (err, data) {
		if (err) {
			return console.log(error);
		}
		input = data.toString().split(",");
		runCommand(input[0], input[1]);
	})

} else {
	runCommand(command, argument)
}}
