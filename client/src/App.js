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
      <a className="login-logout-link" href="/logout">Log Out</a>
    </div>
  )
}

export default App