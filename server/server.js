require('dotenv').config({ path: '../.env' });
const { TwitterClient } = require('twitter-api-client');
const express = require("express");
const FRIEND_CURSOR_COUNT = 100;
const HOME_TIMELINE_COUNT = 20;

// Twitter client with environment variables (.env)
const twitterClient = new TwitterClient({
  apiKey: process.env['TWITTER_API_KEY'],
  apiSecret: process.env['TWITTER_API_KEY_SECRET'],
  accessToken: process.env['TWITTER_ACCESS_TOKEN'],
  accessTokenSecret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
});

// class Friend {
//   constructor(name, profile_picture) {
//     this.name = name;
//     this.profile_picture = profile_picture;
//   }
// }

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

var friends = new Set()
var home_timeline = new Array()

// Print current-following users (for debugging)
async function print_friends() {
  console.log("# of friends: " + friends.size);
  friends.forEach(function(friend) {
    console.log(friend);
  })
  console.log("\n");
}

// Get currently-following users
async function get_friends() {
  try {
    var params = { cursor: -1, count: FRIEND_CURSOR_COUNT };
    while (params.cursor != 0) {
      const data = await twitterClient.accountsAndUsers.friendsList(params);
      console.log(data.users.length);
      for (let i = 0; i < data.users.length; i++) {
        //var cur_friend = new Friend(data.users[i].screen_name, data.users[i].profile_image_url_https);
        //if (!friends.has(cur_friend)) friends.add(cur_friend);
        friends.add(data.users[i].profile_image_url_https);
      }
      params.cursor = data.next_cursor;
    }
    print_friends();
  } catch (e) {
    console.log("Error: ", e);
  }
}

get_friends();

// Print Tweets in home timeline (for debugging)
async function print_home_timeline() {
  console.log("# of Tweets: " + home_timeline.length);
  for (let i = 0; i < home_timeline.length; i++) {
    console.log(home_timeline[i]);
  }
  console.log("\n");
}

// Check if Tweet is already in home timeline; if so, update & return true, else return false
function update_Tweet(tweet) {
  for (let i = home_timeline.length - 1; i >= home_timeline.length - 1 - HOME_TIMELINE_COUNT && i >= 0; i--) {
    if (tweet.id == home_timeline[i].id) {
      home_timeline[i] = tweet;
      return true;
    }
  }
  return false;
}

// Get latest home timeline of Tweets
async function get_home_timeline() {
  try {
    var params = { count: HOME_TIMELINE_COUNT, exclude_replies: true };
    const data = await twitterClient.tweets.statusesHomeTimeline(params);
    for (let i = data.length - 1; i >= 0; i--) {
      var cur_tweet = new Tweet(data[i].created_at, data[i].id, data[i].text, data[i].user.screen_name,
        data[i].user.profile_image_url_https, data[i].favorite_count, data[i].favorited);
      if (!update_Tweet(cur_tweet)) {
        home_timeline.push(cur_tweet);
      }
    }
    print_home_timeline();
  } catch (e) {
    console.log("Error: ", e);
  }
}

// Communicate with client
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({ message: 'Hi from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});