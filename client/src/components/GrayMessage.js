import React from 'react'
import './Message.css'
import TweetProfilePicture from './TweetProfilePicture'
import TailLeft from '../assets/tail_left.png'
import LikeLeft from '../assets/like_left_border.png'
import LikeLeftBlue from '../assets/like_left_blue_border.png'
import LikeRight from '../assets/like_right_border.png'
import LikeRightBlue from '../assets/like_right_blue_border.png'

class GrayMessage extends React.Component {
    componentDidMount() {
        var likes = document.getElementsByClassName("gray-likes");
        for (let i = 0; i < likes.length; i++) {
            var bubble_id = `bubble-${likes[i].id}`;
            var bubble = document.getElementById(bubble_id);
            // likes[i].style.transform = `transform(${bubble.clientWidth}, ${bubble.clientHeight})`
            likes[i].style.marginTop = `${-bubble.clientHeight - 25}px`;
            likes[i].style.marginLeft = `${bubble.clientWidth - 10}px`;
        }
    }

    render() {
        return (
            <div className="gray-tweet">
                <TweetProfilePicture name={this.props.name} url={this.props.profile_picture} diameter={40} />
                <div className="gray-message">
                    <div className="gray-message-body" style={{ position: 'relative' }}>
                        <div id={`bubble-${this.props.id}`} className="gray-bubble">
                            <p className="tweet-text">{this.props.text}</p>
                        </div>
                        <div id={this.props.id} className="gray-likes" // Unsure why some elements require inline style (stylesheet not working)
                            style={{
                                width: '50px',
                                height: '40px',
                                position: 'absolute',
                                display: 'flex',
                                flexDirection: 'row-reverse',
                                alignContent: 'center'
                            }}
                        >
                            {(this.props.likes >= 1 && !this.props.liked) && <img src={LikeRight} className="like" style={{ width: '50px', height: '50px', marginRight: '0' }} alt="Liked by someone else" />}
                            {(this.props.likes >= 1 && this.props.liked) && <img src={LikeRightBlue} className="like" style={{ width: '50px', height: '50px', marginRight: '0' }} alt="Liked by me" />}
                            {(this.props.likes >= 2 && !this.props.liked) && <img src={LikeRight} className="like" style={{ width: '50px', height: '50px', marginRight: '-47px' }} alt="Liked by someone else" />}
                            {(this.props.likes >= 2 && this.props.liked) && <img src={LikeRightBlue} className="like" style={{ width: '50px', height: '50px', marginRight: '-47px' }} alt="Liked by me" />}
                            {(this.props.likes >= 3 && !this.props.liked) && <img src={LikeRight} className="like" style={{ width: '50px', height: '50px', marginRight: '-47px' }} alt="Liked by someone else" />}
                            {(this.props.likes >= 3 && this.props.liked) && <img src={LikeRightBlue} className="like" style={{ width: '50px', height: '50px', marginRight: '-47px' }} alt="Liked by me" />}
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