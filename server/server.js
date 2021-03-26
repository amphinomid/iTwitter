require('dotenv').config({ path: '../.env' });
const { TwitterClient } = require('twitter-api-client');
const express = require('express');
const shuffle = require('shuffle-array');
const FRIEND_CURSOR_COUNT = 200;
const HOME_TIMELINE_COUNT = 20;
const app = express();
const PORT = process.env.PORT || 3001;

// Twitter client with environment variables (.env)
const twitterClient = new TwitterClient({
  apiKey: process.env['TWITTER_API_KEY'],
  apiSecret: process.env['TWITTER_API_KEY_SECRET'],
  accessToken: process.env['TWITTER_ACCESS_TOKEN'],
  accessTokenSecret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
});

class Friend {
  constructor(name, profile_picture) {
    this.name = name;
    this.profile_picture = profile_picture;
  }
}

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

var friends_set = new Set()
var friends = new Array()
var home_timeline = new Array()

// Print current-following users (for debugging)
async function print_friends() {
  console.log("# of friends: " + friends.length);
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
        var prev_size = friends_set.size;
        friends_set.add(data.users[i].profile_image_url_https);
        if (friends_set.size != prev_size) {
          friends.push(new Friend(data.users[i].screen_name, data.users[i].profile_image_url_https));
        }
      }
      params.cursor = data.next_cursor;
    }
    shuffle(friends);
    app.get("/friends", (req, res) => {
      res.json({ message: friends });
    });
    print_friends();
  } catch (e) {
    console.log("Error: ", e);
  }
}

// Print Tweets in home timeline (for debugging)
async function print_home_timeline() {
  console.log("# of Tweets: " + home_timeline.length);
  home_timeline.forEach(function(tweet) {
    console.log(tweet);
  })
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
    app.get("/home_timeline", (req, res) => {
      res.json({ message: home_timeline });
    });
    print_home_timeline();
  } catch (e) {
    console.log("Error: ", e);
  }
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

get_friends();

// Temporary
get_home_timeline();