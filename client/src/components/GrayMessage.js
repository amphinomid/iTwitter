import './Message.css'
import TweetProfilePicture from './TweetProfilePicture'

function GrayMessage(props) {
    return (
        <div className="gray-tweet">
            <TweetProfilePicture name={props.name} url={props.profile_picture} diameter={40} />
            <div className="gray-message">
                <p className="tweet-text">{props.text}</p>
            </div>
        </div>
    )
}

export default GrayMessage
/*
<GrayMessage
                        key={index}
                        time={tweet.time}
                        id={tweet.id}
                        text={tweet.text}
                        name={tweet.name}
                        profile_picture={tweet.profile_picture}
                        likes={tweet.likes}
                        liked={tweet.liked}
                    />
*/