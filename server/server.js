require('dotenv').config({ path: '../.env' });
const { TwitterClient } = require('twitter-api-client');
const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const shuffle = require('shuffle-array');
const FRIEND_CURSOR_COUNT = 200;
const HOME_TIMELINE_COUNT = 75;
const ELAPSED_TIME = 15 * 60 * 1000;
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var twitterClient;
var cur_user;

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
  friends.forEach(function (friend) {
    console.log(friend);
  })
  console.log("\n");
}

// Get currently-following users
async function get_friends() {
  console.log('Getting friends...');
  try {
    var params = { cursor: -1, count: FRIEND_CURSOR_COUNT };
    while (params.cursor != 0) {
      const data = await twitterClient.accountsAndUsers.friendsList(params);
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
    //print_friends();
  } catch (e) {
    console.log("Error: ", e);
  }
}

// Print Tweets in home timeline (for debugging)
async function print_home_timeline() {
  console.log("# of Tweets: " + home_timeline.length);
  home_timeline.forEach(function (tweet) {
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

// Get full text (including full RT, if applicable)
// function get_full_text(tweet) {
//   if (tweet.full_text.substring(0, 2) == "RT") {
//     var colon_index = 0;
//     for (let i = 0; i < tweet.full_text.length; i++) {
//       if (tweet.full_text[i] == ':') {
//         colon_index = i;
//         break;
//       }
//     }
//     return (tweet.full_text.substring(0, colon_index + 2) + tweet.retweeted_status.full_text);
//   }
//   return tweet.full_text;
// }

// Get likes (RT likes, if applicable)
// function get_likes(tweet) {
//   if (tweet.full_text.substring(0, 2) == "RT") {
//     return tweet.retweeted_status.favorite_count;
//   }
//   return tweet.favorite_count;
// }

// Get liked (RT liked, if applicable)
// function get_liked(tweet) {
//   if (tweet.full_text.substring(0, 2) == "RT") {
//     return tweet.retweeted_status.favorited;
//   }
//   return tweet.favorited;
// }

// Handle adjacent Tweets from same person and / or with sufficient time elapsed between them
function handle_streaks() {
  for (let i = home_timeline.length - 2; i >= 0; i--) {
    var cur_date = home_timeline[i].time;
    var prev_date = home_timeline[i + 1].time;
    if (Math.abs(cur_date - prev_date) < ELAPSED_TIME) {
      home_timeline[i + 1].time = 'repeat';
    }
  }
  for (let i = 1; i < home_timeline.length; i++) {
    if (home_timeline[i].name == home_timeline[i - 1].name && home_timeline[i - 1].time == 'repeat') {
      home_timeline[i - 1].profile_picture = 'repeat';
    }
  }
  for (let i = home_timeline.length - 2; i >= 0; i--) {
    if (home_timeline[i].name == home_timeline[i + 1].name && home_timeline[i + 1].time == 'repeat') {
      home_timeline[i + 1].name = 'repeat';
    }
  }
}

// Get latest home timeline of Tweets
async function get_home_timeline() {
  console.log('Getting home timeline...');
  try {
    var params = { count: HOME_TIMELINE_COUNT, exclude_replies: true, tweet_mode: 'extended' };
    const data = await twitterClient.tweets.statusesHomeTimeline(params);
    for (let i = data.length - 1; i >= 0; i--) {
      // var cur_tweet = new Tweet(data[i].created_at, data[i].id, get_full_text(data[i]), data[i].user.screen_name,
      //   data[i].user.profile_image_url_https, get_likes(data[i]), get_liked(data[i]));
      if (data[i].full_text.substring(0, 2) != "RT") {
        var cur_tweet = new Tweet(Date.parse(data[i].created_at), data[i].id_str, data[i].full_text, data[i].user.screen_name,
          data[i].user.profile_image_url_https, data[i].favorite_count, data[i].favorited);
        if (!update_Tweet(cur_tweet)) {
          home_timeline.push(cur_tweet);
        }
      }
    }
    handle_streaks();
    //print_home_timeline();
  } catch (e) {
    console.log("Error: ", e);
  }
}

async function like_tweet(id) {
  console.log('Liking tweet ' + id);
  try {
    var params = { id: id };
    await twitterClient.tweets.favoritesCreate(params);
  } catch (e) {
    console.log("Error: ", e);
  }
}

async function unlike_tweet(id) {
  console.log('Unliking tweet ' + id);
  try {
    var params = { id: id };
    await twitterClient.tweets.favoritesDestroy(params);
  } catch (e) {
    console.log("Error: ", e);
  }
}

async function send_tweet(text) {
  console.log('Tweeting: ' + text);
  try {
    var params = { status: text };
    const data = await twitterClient.tweets.statusesUpdate(params);
    var cur_tweet = new Tweet(Date.parse(data.created_at), data.id_str, data.text, data.user.screen_name,
      data.user.profile_image_url_https, data.favorite_count, data.favorited);
    home_timeline.push(cur_tweet);
  } catch (e) {
    console.log("Error: ", e);
  }
}

/* -------------------------------------------------------------------------------- */

const app = express();
const PORT = process.env.PORT || 3001;

app.use(expressSession({
  secret: 'itwitter-secret',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport setup
passport.serializeUser(function (user, done) {
  cur_user = user;
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  done(null, cur_user);
});
passport.use(new TwitterStrategy({
  consumerKey: process.env['TWITTER_API_KEY'],
  consumerSecret: process.env['TWITTER_API_KEY_SECRET'],
  callbackURL: "https://itwitterapp.herokuapp.com/auth/twitter/callback"
},
  function (token, tokenSecret, profile, done) {
    process.env['TWITTER_ACCESS_TOKEN'] = token;
    process.env['TWITTER_ACCESS_TOKEN_SECRET'] = tokenSecret;
    // Twitter API client setup
    twitterClient = new TwitterClient({
      apiKey: process.env['TWITTER_API_KEY'],
      apiSecret: process.env['TWITTER_API_KEY_SECRET'],
      accessToken: process.env['TWITTER_ACCESS_TOKEN'],
      accessTokenSecret: process.env['TWITTER_ACCESS_TOKEN_SECRET']
    });
    return done(null, profile);
  }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/auth/twitter", passport.authenticate("twitter"));

app.get("/auth/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/timeline",
    failureRedirect: "/"
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Authentication failed. Please try again." })
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.get("/timeline", (req, res) => {
  get_friends();
  get_home_timeline();
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.get("/logout", function (req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

app.get("/friends", (req, res) => {
  get_friends();
  res.json({ message: friends })
})

app.get("/home_timeline", (req, res) => {
  get_home_timeline();
  res.json({ message: home_timeline });
})

app.post("/react_to_tweet", (req, res) => {
  if (req.body.reaction == 'like') {
    res.json({ message: like_tweet(req.body.id) })
  } else if (req.body.reaction == 'unlike') {
    res.json({ message: unlike_tweet(req.body.id) })
  }
})

app.post("/send_tweet", (req, res) => {
  res.json({ message: send_tweet(req.body.text) });
})