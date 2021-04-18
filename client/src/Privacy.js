import React from 'react'
import './App.css'

function Privacy() {
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
            This app signs you into Twitter using Twitter API, and Tweets, likes, and unlikes Tweets on your behalf. This app doesn't store your info&#8211;however, please
            exit your browser session to fully log out.
            <a className="styled-link" href="/">Back</a>
        </div>
    )
}

export default Privacy