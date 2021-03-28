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
- Infinite scroll — needs to retrieve new Tweets upon scrolling to bottom
  - Infinite scroll should display loading icons
- Nonlinear scroll — decreasing speed over duration of a single scroll
- Update likes in real time, add sound effects
- Time: swipe left to see timestamps; only display timestamp in middle of screen if sufficient time elapsed between two Tweets,
  / before the very first (oldest) Tweet of the session
- Maybe add unfollowing functionality — "remove from groupchat" — but this might be weird because removing from groupchat is
  two-way, unfollowing isn't
- If already liked Tweet, "options" pop-up should indicate so (need to make a new set of options icons with blue like icons without tails)
- Exception for two adjacent Tweets from the same person (don't display profile picture twice, and don't put a tail on first one)
- Style scrollbar like iMessage's (thin & gray bar)
- Start scroll position at latest Tweet
- Tweeting / sending message: similar animation as when sending iMessage; also, should resize up
*/