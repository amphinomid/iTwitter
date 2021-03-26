import React from 'react'
import './Message.css'
import TweetProfilePicture from './TweetProfilePicture'
import TailLeft from '../assets/tail_left.png'

// function GrayMessage(props) {
//     return (
//         <div className="gray-tweet">
//             <TweetProfilePicture name={props.name} url={props.profile_picture} diameter={40} />
//             <div className="gray-message">
//                 <div className="gray-message-body">
//                     <div id={props.id} className="gray-bubble">
//                         <p className="tweet-text">{props.text}</p>
//                     </div>
//                     <div className="gray-likes"
//                         style={{
//                             width: '60px',
//                             height: '40px',
//                             position: 'absolute',
//                             x: document.getElementById(props.id).clientWidth,
//                             y: document.getElementById(props.id).clientTop,
//                             backgroundColor: '#FFFFFF'
//                         }}
//                     >
//                     </div>
//                 </div>
//                 <img className="gray-tail" src={TailLeft} alt='Tail of gray message bubble' />
//             </div>
//         </div>
//     )
// }

class GrayMessage extends React.Component {
    componentDidMount() {
        var likes = document.getElementsByClassName("gray-likes");
        for (let i = 0; i < likes.length; i++) {
            var bubble_id = `bubble-${likes[i].id}`;
            var bubble = document.getElementById(bubble_id);
            // likes[i].style.transform = `transform(${bubble.clientWidth}, ${bubble.clientHeight})`
            likes[i].style.marginTop = `${-bubble.clientHeight - 25}px`;
            likes[i].style.marginLeft = `${bubble.clientWidth - 15}px`;
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
                        <div id={this.props.id} className="gray-likes"
                            style={{
                                width: '60px',
                                height: '40px',
                                position: 'absolute',
                                backgroundColor: '#FFFFFF'
                            }}
                        >
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