import React from 'react'
import './App.css'

function Privacy() {
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
            <p style={{ width: '500px', textAlign: 'center', color: 'white' }}>
                This app signs you into Twitter using Twitter API, retrieves your followings, and Tweets, likes, and unlikes Tweets on your behalf. This app doesn't store
                your info&#8211;however, (due to a problem I'm still working on fixing!) please <b>close your browser window</b> (not tab) to fully log out.
            </p>
            <a className="styled-link" href="/">Back</a>
        </div>
    )
}

export default Privacy