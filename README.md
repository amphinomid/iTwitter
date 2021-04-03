# iTwitter
Turn your Twitter timeline into an iMessage groupchat for max absurdity. Enjoy!

### Usage Notes & Caveats
- Clone the project, create a .env file in root (same level as this file), and set NODE_ENV, PORT, TWITTER_API_KEY, TWITTER_API_KEY_SECRET, TWITTER_ACCESS_TOKEN, and TWITTER_ACCESS_TOKEN_SECRET (you'll need a Twitter developer account)
- Timeline doesn't update automatically; infinite scroll is activated by scrolling downwards at the bottom of the feed
- There's a small lag between when likes & unlikes are registered by the Twitter api, so scrolling / refreshing immediately after liking / unliking may cause the app to display the false status for a liked / unliked Tweet
- No retweet functionality, no replies (might accidentally subtweet), no deleting Tweets
- Basically SMS, text-only

### TODO
- Item nesting in GrayMessage.js and BlueMessage.js and corresponding CSS in Message.css are quite messy, can be cleaned up
- Perhaps add retweet functionality later (retweet twice = no effect); see icons in "options-unused"
- Maybe add unfollowing functionality — "remove from groupchat" — but this might be weird because removing from groupchat is
  two-way, unfollowing isn't
  - Counterpoint: the app displays Tweets from followings, which are not necessarily two-way anyway
- Swipe left to see timestamps on messages (in general, better animations — perhaps using react-use-gesture and react-spring)
  - Another animation idea: tweeting / sending message: similar animation as when sending iMessage
  - Another animation idea: nonlinear - decrease speed over duration of single scroll
- Style scrollbar like iMessage's (thin & gray bar)
- Double-tap header to scroll to top
- Autosizing textarea should actually push the entire stream of Tweets upwards, not cover them)
- Add error-handling for liking / unliking / Tweeting
- Add functionality for deleting Tweets

### Acknowledgements
The following resources were really helpful in the development of this project!
- Tutorials:
    - [Setup](https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/)
- Libraries / packages:
    - [twitter-api-client](https://www.npmjs.com/package/twitter-api-client)
    - [shuffle-array](https://www.npmjs.com/package/shuffle-array)
    - [autolinker](https://www.npmjs.com/package/autolinker)
    - [autosize](https://www.npmjs.com/package/autosize)
    - [react-scroll-to-bottom](https://www.npmjs.com/package/react-scroll-to-bottom)
    - [he](https://www.npmjs.com/package/he)