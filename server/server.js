require('dotenv').config({ path: '../.env' });
const { TwitterClient } = require('twitter-api-client');
const express = require("express");

const twitterClient = new TwitterClient({
  apiKey: process.env['TWITTER_API_KEY'],
  apiSecret: process.env['TWITTER_API_KEY_SECRET'],
  accessToken: process.env['TWITTER_ACCESS_TOKEN'],
  accessTokenSecret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
});

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

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({ message: 'Hi from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});