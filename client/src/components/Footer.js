import React from 'react'
import './Footer.css'
import autosize from 'autosize'
import SendTweetButton from '../assets/send.png'
import CannotSendTweetButton from '../assets/cannot_send.png'

function update_padding() {
    var send_tweet = document.getElementsByClassName("send-tweet")[0];
    var send_tweet_rect = send_tweet.getBoundingClientRect();
    document.getElementsByClassName("send-tweet-padding")[0].style.bottom = `${document.body.clientHeight - send_tweet_rect.y}px`;

    var send_tweet_contents = send_tweet.value;
    if (send_tweet_contents.length > 280) {
        document.getElementsByClassName("send-tweet-button")[0].src = CannotSendTweetButton;
    } else {
        document.getElementsByClassName("send-tweet-button")[0].src = SendTweetButton;
    }
}

function Footer() {
    React.useEffect(() => {
        update_padding();
        autosize(document.getElementsByClassName("send-tweet")[0]);
    }, []);

    return (
        <div>
            <div className="send-tweet-padding" style={{ bottom: '0' }} />
            <div className="send-tweet-container">
                <textarea className="send-tweet" onChange={update_padding} placeholder="iMessage" rows={1}></textarea>
                <input className="send-tweet-button" type="image" src={SendTweetButton} alt="Send tweet" />
            </div>
        </div>
    )
}

export default Footer
