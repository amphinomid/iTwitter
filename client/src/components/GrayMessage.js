import React from 'react'
import './Message.css'
import TweetProfilePicture from './TweetProfilePicture'
import TailLeft from '../assets/tail_left.png'
import LikeRight from '../assets/like_right_border.png'
import LikeRightBlue from '../assets/like_right_blue_border.png'
let textTolink = require('text-to-link')

class GrayMessage extends React.Component {
    componentDidMount() {
        var tweet_texts = document.getElementsByClassName("gray-tweet-text");
        for (let i = 0; i < tweet_texts.length; i++) {
            tweet_texts[i].innerHTML = textTolink(tweet_texts[i].innerHTML, {target: "_blank", rel: "_noreferrer"})
        }
        var likes = document.getElementsByClassName("gray-likes");
        for (let i = 0; i < likes.length; i++) {
            var bubble_id = `bubble-${likes[i].id}`;
            var bubble = document.getElementById(bubble_id);
            likes[i].style.marginTop = `${-bubble.clientHeight - 25}px`;
            likes[i].style.marginLeft = `${bubble.clientWidth - 2}px`;
        }
    }

    render() {
        return (
            <div className="gray-tweet">
                <TweetProfilePicture name={this.props.name} url={this.props.profile_picture} diameter={40} />
                <div className="gray-message">
                    <div className="gray-message-body" style={{ position: 'relative' }}>
                        <p style={{ margin: '-5px 0 -5px 27.5px', fontSize: '0.7rem', color: 'white' }}>{this.props.name}</p>
                        <div id={`bubble-${this.props.id}`} className="gray-bubble">
                            <p className="gray-tweet-text">{this.props.text}</p>
                        </div>
                        <div id={this.props.id} className="gray-likes">
                            {(this.props.likes >= 1 && !this.props.liked) && <img src={LikeRight} className="like" style={{ marginRight: '0' }} alt="Liked by someone else" />}
                            {(this.props.likes >= 1 && this.props.liked) && <img src={LikeRightBlue} className="like" style={{ marginRight: '0' }} alt="Liked by me" />}
                            {(this.props.likes >= 2 && !this.props.liked) && <img src={LikeRight} className="like" style={{ marginRight: '-47px' }} alt="Liked by someone else" />}
                            {(this.props.likes >= 2 && this.props.liked) && <img src={LikeRightBlue} className="like" style={{ marginRight: '-47px' }} alt="Liked by me" />}
                            {(this.props.likes >= 3 && !this.props.liked) && <img src={LikeRight} className="like" style={{ marginRight: '-47px' }} alt="Liked by someone else" />}
                            {(this.props.likes >= 3 && this.props.liked) && <img src={LikeRightBlue} className="like" style={{ marginRight: '-47px' }} alt="Liked by me" />}
                        </div>
                    </div>
                    <img className="gray-tail" src={TailLeft} alt='Tail of gray message bubble' />
                </div>
            </div>
        )
    }
}

export default GrayMessage

/*
TODO: Remove when done
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