import React from 'react'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

function App() {
  return (
    <div className="container">
      <div className="imessage">
        <div className="body">
          <Body />
        </div>
        <div className="header">
          <Header />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App

/*
TODO:
- LIKES
  - Update likes when infinite-scroll
- MESSAGES
  - Swipe left to see timestamps on messages
  - Display timestamp in middle of screen if sufficient time elapsed between two Tweets
  - Also display timestamp before the oldest Tweet of session
  - Tweeting / sending message: similar animation as when sending iMessage
- SCROLL
  - Infinite: display loading icons while retrieving new Tweets (upon scrolling to bottom)
  - Nonlinear - decrease speed over duration of single scroll
  - Style scrollbar like iMessage's (thin & gray bar)
- STYLE & OVERALL & MINOR
  - After the "look" of the app works, connect everything to Twitter api client
    - Validate removeLike works after connecting everything - currently doesn't, because depends on actual like numbers
  - Item nesting in GrayMessage.js and BlueMessage.js and corresponding CSS in Message.css are quite messy, can be cleaned up
  - No reply functionality, no retweets
    - Perhaps add retweet functionality later (retweet twice = no effect); see icons in "options-unused"
  - Maybe add unfollowing functionality — "remove from groupchat" — but this might be weird because removing from groupchat is
    two-way, unfollowing isn't
  - Might look better if adjacent Tweets from same user are more closely-spaced
*/