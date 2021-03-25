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
  var prev_cursor = 0;
  var cursor = -1;
  var params = { };
  while (prev_cursor != cursor) {
    const data = await twitterClient.accountsAndUsers.friendsList(params);
    //console.log(data)
    console.log(data.users.length)
    for (let i = 0; i < data.users.length; i++) {
      console.log(data.users[i].profile_image_url_https)
    }
    prev_cursor = cursor;
    cursor = data.next_cursor;
    params.cursor = cursor;
  }
}

get_friends()

class Tweet {
  constructor(time, id, text, name, profile_picture, likes, liked) {
    this.time = time;
    this.id = id;
    this.text = text;
    this.name = name;
    this.profile_picture = profile_picture;
    this.likes = likes;
    this.liked = liked;
  }
}

var home_timeline_tweets_set = new Set()
var home_timeline_tweets = new Array() // Haven't yet decided how to do this — existing Tweets need to be updated if likes / liked changed

async function get_home_timeline() {
  var params = { count: 20, exclude_replies: true };
  const data = await twitterClient.tweets.statusesHomeTimeline(params);
  for (let i = data.length - 1; i >= 0; i--) {
    console.log(data[i].created_at)
    console.log(data[i].id)
    console.log(data[i].text)
    console.log(data[i].user.screen_name)
    console.log(data[i].user.profile_image_url_https)
    console.log(data[i].favorite_count)
    console.log(data[i].favorited)
    console.log("\n")
  }
}

//get_home_timeline()

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({ message: 'Hi from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});