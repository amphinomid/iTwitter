require('dotenv').config({ path: '../.env' });
const { TwitterClient } = require('twitter-api-client');
const express = require("express");
const HOME_TIMELINE_COUNT = 3;

// Twitter client with environment variables (.env)
const twitterClient = new TwitterClient({
  apiKey: process.env['TWITTER_API_KEY'],
  apiSecret: process.env['TWITTER_API_KEY_SECRET'],
  accessToken: process.env['TWITTER_ACCESS_TOKEN'],
  accessTokenSecret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
});

// Class storing essential elements from Tweets
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

// Latest home timeline of Tweets, updated cumulatively with each call to get_home_timeline
var home_timeline = new Array()

// Get currently-following users
async function get_friends() {
  try {
    var prev_cursor = 0;
    var cursor = -1;
    var params = {};
    while (prev_cursor != cursor) {
      const data = await twitterClient.accountsAndUsers.friendsList(params);
      console.log(data.users.length);
      for (let i = 0; i < data.users.length; i++) {
        console.log(data.users[i].profile_image_url_https);
      }
      prev_cursor = cursor;
      cursor = data.next_cursor;
      params.cursor = cursor;
    }
  } catch (e) {
    console.log("Error: ", e);
  }
}

//get_friends();

async function print_home_timeline() {
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
      var cur_tweet = new Tweet();
      cur_tweet.time = data[i].created_at;
      cur_tweet.id = data[i].id;
      cur_tweet.text = data[i].text;
      cur_tweet.name = data[i].user.screen_name;
      cur_tweet.profile_picture = data[i].user.profile_image_url_https;
      cur_tweet.likes = data[i].favorite_count;
      cur_tweet.liked = data[i].favorited;

      // var updated = false;
      // for (let i = home_timeline.length - 1; i >= home_timeline.length - 1 - HOME_TIMELINE_COUNT && i >= 0; i--) {
      //   if (cur_tweet.id == home_timeline[i].id) {
      //     home_timeline[i] = cur_tweet;
      //     updated = true;
      //     break;
      //   }
      // }
      // if (!updated) {
      //   home_timeline.push(cur_tweet);
      // }

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