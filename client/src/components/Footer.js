import React from 'react'
import './Footer.css'
import autosize from 'autosize'
import SendTweetButton from '../assets/send.png'

function move_padding() {
    var send_tweet_rect = document.getElementsByClassName("send-tweet")[0].getBoundingClientRect();
    console.log(document.body.clientHeight);
    console.log(send_tweet_rect.y);
    document.getElementsByClassName("send-tweet-padding")[0].style.bottom = `${document.body.clientHeight - send_tweet_rect.y}px`;
}

function Footer() {
    React.useEffect(() => {
        autosize(document.getElementsByClassName("send-tweet")[0]);
    }, []);

    return (
        <div>
            <div className="send-tweet-padding" style={{ bottom: '0' }} />
            <div className="send-tweet-container">
                <textarea className="send-tweet" placeholder="iMessage" onChange={move_padding} rows={1}></textarea>
                <input className="send-tweet-button" type="image" src={SendTweetButton} alt="Send tweet" />
            </div>
        </div>
    )
}

export default Footer
