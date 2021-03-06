import React from 'react'
import './Message.css'
import TailRight from '../assets/tail_right.png'
import LikeLeft from '../assets/like_left_border.png'
import LikeLeftBlue from '../assets/like_left_blue_border.png'
import Autolinker from 'autolinker'
import he from 'he'

class BlueMessage extends React.Component {
    updateAddIcon(id) {
        if (id !== -1) {
            var first_like = document.getElementById(`first-like-${id}`);
            var second_like = document.getElementById(`second-like-${id}`);
            var third_like = document.getElementById(`third-like-${id}`);

            if (third_like && third_like.style.visibility === 'visible') {
                third_like.src = LikeLeftBlue;
            } else if (second_like && second_like.style.visibility === 'visible') {
                third_like.src = LikeLeftBlue;
                third_like.style.visibility = 'visible';
            } else if (first_like && first_like.style.visibility === 'visible') {
                second_like.src = LikeLeftBlue;
                second_like.style.visibility = 'visible';
            } else {
                first_like.src = LikeLeftBlue;
                first_like.style.visibility = 'visible';
            }
            document.getSelection().removeAllRanges();
        }
    }

    addLike(id) {
        fetch("/react_to_tweet", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                reaction: 'like'
            })
        })
            .then((res) => console.log(res))
            .then(() => this.updateAddIcon(id));
    }

    updateRemoveIcon(id, likes) {
        if (id !== -1) {
            var first_like = document.getElementById(`first-like-${id}`);
            var second_like = document.getElementById(`second-like-${id}`);
            var third_like = document.getElementById(`third-like-${id}`);
            if (likes > 3 && third_like.src.includes(LikeLeftBlue) && third_like.style.visibility === 'visible') {
                third_like.src = LikeLeft;
            } else if (likes === 3 && third_like.src.includes(LikeLeftBlue) && third_like.style.visibility === 'visible') {
                third_like.src = LikeLeft;
                third_like.style.visibility = 'hidden';
            } else if (likes === 2 && second_like.src.includes(LikeLeftBlue) && second_like.style.visibility === 'visible') {
                second_like.src = LikeLeft;
                second_like.style.visibility = 'hidden';
            } else if (likes === 1 && first_like.src.includes(LikeLeftBlue) && first_like.style.visibility === 'visible') {
                first_like.src = LikeLeft;
                first_like.style.visibility = 'hidden';
            }
        }
    }

    removeLike(id, likes) {
        fetch("/react_to_tweet", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                reaction: 'unlike'
            })
        })
            .then((res) => console.log(res))
            .then(() => this.updateRemoveIcon(id, likes));
    }

    componentDidMount() {
        var tweet_texts = document.getElementsByClassName("blue-tweet-text");
        for (let i = 0; i < tweet_texts.length; i++) {
            tweet_texts[i].innerHTML = he.decode(Autolinker.link(tweet_texts[i].innerHTML, { mention: 'twitter' }))
        }
        var likes = document.getElementsByClassName("blue-likes");
        for (let i = 0; i < likes.length; i++) {
            var bubble_id = `bubble-${likes[i].id}`;
            var bubble = document.getElementById(bubble_id);
            likes[i].style.marginBottom = `${bubble.clientHeight - 16}px`;
            likes[i].style.marginRight = `${bubble.clientWidth + 7}px`;
        }
    }

    render() {
        return (
            <div className="blue-tweet">
                <div className="blue-message" onDoubleClick={() => { this.addLike(this.props.id) }}>
                    <div className="blue-message-body">
                        <div id={`bubble-${this.props.id}`} className="blue-bubble">
                            <p id={`text-${this.props.id}`} className="blue-tweet-text">{this.props.text}</p>
                        </div>
                    </div>
                    <div id={this.props.id} className="blue-likes">
                        <img src={this.props.liked && this.props.likes === 1 ? LikeLeftBlue : LikeLeft} id={`first-like-${this.props.id}`} className="first-like" onClick={() => { this.removeLike(this.props.id, this.props.likes) }} style={{ marginLeft: '0', visibility: this.props.likes >= 1 ? 'visible' : 'hidden' }} alt="Like" />
                        <img src={this.props.liked && this.props.likes === 2 ? LikeLeftBlue : LikeLeft} id={`second-like-${this.props.id}`} className="second-like" onClick={() => { this.removeLike(this.props.id, this.props.likes) }} style={{ marginLeft: '-47px', visibility: this.props.likes >= 2 ? 'visible' : 'hidden' }} alt="Like" />
                        <img src={this.props.liked && this.props.likes >= 3 ? LikeLeftBlue : LikeLeft} id={`third-like-${this.props.id}`} className="third-like" onClick={() => { this.removeLike(this.props.id, this.props.likes) }} style={{ marginLeft: '-47px', visibility: this.props.likes >= 3 ? 'visible' : 'hidden' }} alt="Like" />
                    </div>
                    {this.props.profile_picture !== 'repeat' && <img className="blue-tail" src={TailRight} alt='Tail of blue message bubble' />}
                </div>
            </div>
        )
    }
}

export default BlueMessage

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