import React from 'react'
import './Message.css'
import TailRight from '../assets/tail_right.png'
import LikeLeft from '../assets/like_left_border.png'
import LikeLeftBlue from '../assets/like_left_blue_border.png'

class BlueMessage extends React.Component {
    componentDidMount() {
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
                <div className="blue-message">
                    <div className="blue-message-body">
                        <div id={`bubble-${this.props.id}`} className="blue-bubble">
                            <p className="tweet-text">{this.props.text}</p>
                        </div>
                        <div id={this.props.id} className="blue-likes">
                            {(this.props.likes >= 1 && !this.props.liked) && <img src={LikeLeft} className="like" style={{ marginLeft: '0' }} alt="Liked by someone else" />}
                            {(this.props.likes >= 1 && this.props.liked) && <img src={LikeLeftBlue} className="like" style={{ marginLeft: '0' }} alt="Liked by me" />}
                            {(this.props.likes >= 2 && !this.props.liked) && <img src={LikeLeft} className="like" style={{ marginLeft: '-47px' }} alt="Liked by someone else" />}
                            {(this.props.likes >= 2 && this.props.liked) && <img src={LikeLeftBlue} className="like" style={{ marginLeft: '-47px' }} alt="Liked by me" />}
                            {(this.props.likes >= 3 && !this.props.liked) && <img src={LikeLeft} className="like" style={{ marginLeft: '-47px' }} alt="Liked by someone else" />}
                            {(this.props.likes >= 3 && this.props.liked) && <img src={LikeLeftBlue} className="like" style={{ marginLeft: '-47px' }} alt="Liked by me" />}
                        </div>
                    </div>
                    <img className="blue-tail" src={TailRight} alt='Tail of blue message bubble' />
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