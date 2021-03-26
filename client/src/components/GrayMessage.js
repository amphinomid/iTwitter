import './Message.css'
import TweetProfilePicture from './TweetProfilePicture'
import TailLeft from '../assets/tail_left.png'

function GrayMessage(props) {
    return (
        <div className="gray-tweet">
            <TweetProfilePicture name={props.name} url={props.profile_picture} diameter={40} />
            <div className="gray-message">
                <div className="gray-bubble">
                    <p className="tweet-text">{props.text}</p>
                </div>
                <img className="gray-tail" src={TailLeft} alt='Tail of gray message bubble' />
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