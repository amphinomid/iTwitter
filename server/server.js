require('dotenv').config({ path: '../.env' });
const { TwitterClient } = require('twitter-api-client');
//const Twitter = require('twitter');
const express = require("express");

const twitterClient = new TwitterClient({
  apiKey: process.env['TWITTER_API_KEY'],
  apiSecret: process.env['TWITTER_API_KEY_SECRET'],
  accessToken: process.env['TWITTER_ACCESS_TOKEN'],
  accessTokenSecret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
});
// var client = new Twitter({
//   consumer_key: process.env['TWITTER_API_KEY'],
//   consumer_secret: process.env['TWITTER_API_KEY_SECRET'],
//   access_token_key: process.env['TWITTER_ACCESS_TOKEN'],
//   access_token_secret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
// });

async function get_friends() {
  const data = await twitterClient.accountsAndUsers.friendsList();
  console.log(data)
}

//get_friends()

async function get_home_timeline() {
  var params = { count: 20, exclude_replies: true }
  const data = await twitterClient.tweets.statusesHomeTimeline(params);
  console.log(data)
}

get_home_timeline()

// function get_home_timeline() {
//   client.stream('statuses/home_timeline', {}, function (stream) {
//     stream.on('data', function (tweet) {
//       console.log(tweet.text);
//     });

//     stream.on('error', function (error) {
//       console.log(error);
//     });
//   });
// }

// get_home_timeline()

// var params = {screen_name: '_anli'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({ message: 'Hi from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});