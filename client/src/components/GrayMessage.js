import React from 'react'
import './Message.css'
import TweetProfilePicture from './TweetProfilePicture'
import TailLeft from '../assets/tail_left.png'
import LikeRight from '../assets/like_right_border.png'
import LikeRightBlue from '../assets/like_right_blue_border.png'
import Autolinker from 'autolinker'
import he from 'he'

class GrayMessage extends React.Component {
    addLike(id) {
        var first_like = document.getElementById(`first-like-${id}`);
        var second_like = document.getElementById(`second-like-${id}`);
        var third_like = document.getElementById(`third-like-${id}`);

        if (third_like && third_like.style.visibility === 'visible') {
            third_like.src = LikeRightBlue;
        } else if (second_like && second_like.style.visibility === 'visible') {
            third_like.src = LikeRightBlue;
            third_like.style.visibility = 'visible';
        } else if (first_like && first_like.style.visibility === 'visible') {
            second_like.src = LikeRightBlue;
            second_like.style.visibility = 'visible';
        } else {
            first_like.src = LikeRightBlue;
            first_like.style.visibility = 'visible';
        }
        document.getSelection().removeAllRanges();
    }

    removeLike(id, likes) {
        var first_like = document.getElementById(`first-like-${id}`);
        var second_like = document.getElementById(`second-like-${id}`);
        var third_like = document.getElementById(`third-like-${id}`);
        if (likes > 3 && third_like.src.includes(LikeRightBlue) && third_like.style.visibility === 'visible') {
            third_like.src = LikeRight;
        } else if (likes === 3 && third_like.src.includes(LikeRightBlue) && third_like.style.visibility === 'visible') {
            third_like.src = LikeRight;
            third_like.style.visibility = 'hidden';
        } else if (likes === 2 && second_like.src.includes(LikeRightBlue) && second_like.style.visibility === 'visible') {
            second_like.src = LikeRight;
            second_like.style.visibility = 'hidden';
        } else if (likes === 1 && first_like.src.includes(LikeRightBlue) && first_like.style.visibility === 'visible') {
            first_like.src = LikeRight;
            first_like.style.visibility = 'hidden';
        }
    }

    componentDidMount() {
        var tweet_texts = document.getElementsByClassName("gray-tweet-text");
        for (let i = 0; i < tweet_texts.length; i++) {
            tweet_texts[i].innerHTML = he.decode(Autolinker.link(tweet_texts[i].innerHTML, { mention: 'twitter' }))
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
                <TweetProfilePicture name={this.props.name} url={this.props.profile_picture} repeat={this.props.profile_picture} diameter={40} />
                <div className="gray-message" onDoubleClick={() => { this.addLike(this.props.id) }}>
                    {this.props.name !== 'repeat' && <p style={{ margin: '-5px 0 -5px 27.5px', fontSize: '0.7rem', color: 'white' }}>{this.props.name}</p>}
                    <div className="gray-message-body" style={{ position: 'relative' }}>
                        <div id={`bubble-${this.props.id}`} className="gray-bubble">
                            <p id={`text-${this.props.id}`} className="gray-tweet-text">{this.props.text}</p>
                        </div>
                    </div>
                    <div id={this.props.id} className="gray-likes">
                        <img src={this.props.liked ? LikeRightBlue : LikeRight} id={`first-like-${this.props.id}`} className="first-like" onClick={() => { this.removeLike(this.props.id, this.props.likes) }} style={{ marginRight: '0', visibility: this.props.likes >= 1 ? 'visible' : 'hidden' }} alt="Like" />
                        <img src={this.props.liked ? LikeRightBlue : LikeRight} id={`second-like-${this.props.id}`} className="second-like" onClick={() => { this.removeLike(this.props.id, this.props.likes) }} style={{ marginRight: '-47px', visibility: this.props.likes >= 2 ? 'visible' : 'hidden' }} alt="Like" />
                        <img src={this.props.liked ? LikeRightBlue : LikeRight} id={`third-like-${this.props.id}`} className="third-like" onClick={() => { this.removeLike(this.props.id, this.props.likes) }} style={{ marginRight: '-47px', visibility: this.props.likes >= 3 ? 'visible' : 'hidden' }} alt="Like" />
                    </div>
                    {this.props.profile_picture !== 'repeat' && <img className="gray-tail" src={TailLeft} alt='Tail of gray message bubble' />}
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