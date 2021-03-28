import React from 'react';
import './Footer.css'
import autosize from 'autosize'
import SendTweetButton from '../assets/send.png'

function Footer() {
    React.useEffect(() => {
        var send_tweet = document.getElementsByClassName("send-tweet")[0];
        document.getElementsByClassName("footer-container")[0].style.height = `${send_tweet.style.height + 2}rem`;
        autosize(send_tweet);
    }, []);

    return (
        <div className="footer-container">
            <textarea className="send-tweet" placeholder="iMessage" rows={1}></textarea>
            <input className="send-tweet-button" type="image" src={SendTweetButton} alt="Send tweet" />
        </div>
    )
}

export default Footer
