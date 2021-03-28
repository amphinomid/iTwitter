import React from 'react'
import './Body.css'
import Message from './Message'

function Body() {
    // Temporary
    const [home_timeline, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/home_timeline")
            .then((res) => res.json())
            .then((home_timeline) => setData(home_timeline.message));
    }, []);

    return (
        <div className="body-container">
            <div className="placeholder" />
            {!home_timeline
                ? <p style={{ textAlign: 'center', margin: 'auto' }}></p>
                : home_timeline.map((tweet) =>
                    <Message
                        key={tweet.id}
                        time={tweet.time}
                        id={tweet.id}
                        text={tweet.text}
                        name={tweet.name}
                        profile_picture={tweet.profile_picture}
                        likes={tweet.likes}
                        liked={tweet.liked}
                    />
                )
            }
        </div>
    )
}

export default Body
