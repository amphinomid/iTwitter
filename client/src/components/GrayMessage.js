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

            var first_like = document.getElementById(`first-like-${this.props.id}`);
            var second_like = document.getElementById(`second-like-${this.props.id}`);
            var third_like = document.getElementById(`third-like-${this.props.id}`);

            if (third_like.style.visibility == 'visible') {

            } else if (second_like.style.visibility == 'visible') {

            } else if (first_like.style.visibility == 'visible') {
                
            }
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
                            {(this.props.likes >= 1) && <img src={LikeRight} id={`first-like-${this.props.id}`} className="first-like" style={{ marginRight: '0', visibility: 'visible' }} alt="Like" />}
                            {(this.props.likes >= 2) && <img src={LikeRight} id={`second-like-${this.props.id}`} className="second-like" style={{ marginRight: '-47px', visibility: 'visible' }} alt="Like" />}
                            {(this.props.likes >= 3) && <img src={LikeRight} id={`third-like-${this.props.id}`} className="third-like" style={{ marginRight: '-47px', visibility: 'visible' }} alt="Like" />}
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