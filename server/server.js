require('dotenv').config({ path: '../.env' });
const Twitter = require('twitter');
const { TwitterClient } = require('twitter-api-client');
const express = require("express");

// var client = new Twitter({
//   consumer_key: process.env['TWITTER_API_KEY'],
//   consumer_secret: process.env['TWITTER_API_KEY_SECRET'],
//   access_token_key: process.env['TWITTER_ACCESS_TOKEN'],
//   access_token_secret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
// });

// var params = {screen_name: '_anli'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

const twitterClient = new TwitterClient({
  apiKey: process.env['TWITTER_API_KEY'],
  apiSecret: process.env['TWITTER_API_KEY_SECRET'],
  accessToken: process.env['TWITTER_ACCESS_TOKEN'],
  accessTokenSecret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
});

async function get_followings() {
  const data = await twitterClient.accountsAndUsers.usersSearch({ q: 'twitterDev' });
  console.log(data)
}

get_followings()

const app = express();
const PORT = process.env.PORT || 3001;

// client.get('/2/users/1352700790318784513/following', function (error, tweets, response) {
//   if (error) throw error;
//   console.log(tweets);
//   console.log(response);
// });

app.get("/api", (req, res) => {
  res.json({ message: 'Hi from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});