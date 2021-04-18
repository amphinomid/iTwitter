import React from 'react'
import './App.css'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
      <a className="styled-link" href="/auth/twitter">Sign in with Twitter</a>
      <a className="styled-link" href="/privacy">Privacy</a>
    </div>
  )
}

export default App