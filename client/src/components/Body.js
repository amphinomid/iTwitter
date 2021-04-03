import React from 'react'
import './Body.css'
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom';
import TweetProfilePicture from './TweetProfilePicture'
import LoadingProfilePicture from '../assets/loading_profile_picture.png'
import Loading1 from '../assets/loading.gif'
import CannotSendTweetButton from '../assets/cannot_send.png'

var update_count = 0;
var last_scroll = 0;

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: []
        };
        this.update_timeline = this.update_timeline.bind(this);
    }

    update_timeline(show_loading) {
        var loading = document.getElementsByClassName("loading")[0];
        if (show_loading) loading.style.display = 'block';
        console.log('Updating timeline...');
        fetch("/home_timeline", { method: 'GET' })
            .then((res) => res.json())
            .then((home_timeline) => this.setState({ timeline: home_timeline.message }))
            .then(() => setTimeout(() => loading.style.display = 'none', 1000));
    }

    check_scroll() {
        var scroll_check_rect = document.getElementsByClassName("scroll-check")[0].getBoundingClientRect();
        var reload_y = document.getElementsByClassName("footer")[0].getBoundingClientRect().top - 15;
        if (scroll_check_rect.bottom <= last_scroll && Math.abs(scroll_check_rect.bottom - reload_y) < 5) {
            if (update_count++ > 1 && update_count % 4 === 0) {
                this.update_timeline(true);
            }
        }
        last_scroll = scroll_check_rect.bottom;
    }

    send_tweet() {
        if (document.getElementsByClassName("send-tweet-button")[0].src === CannotSendTweetButton) return;
        var send_tweet = document.getElementsByClassName("send-tweet")[0];
        var text = send_tweet.value;
        fetch("/send_tweet", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: text
            })
        })
            .then((res) => console.log(res))
            .then(() => send_tweet.value = '')
            .then(() => send_tweet.style.height = send_tweet.style.lineHeight)
            .then(() => this.update_timeline(false));
    }

    componentDidMount() {
        this.update_timeline(true);
        window.addEventListener('scroll', () => this.check_scroll(), true);
        document.getElementsByClassName("send-tweet-button")[0].addEventListener('click', () => this.send_tweet());
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => this.check_scroll(), true);
        document.getElementsByClassName("send-tweet-button")[0].removeEventListener('click', () => this.send_tweet());
    }

    render() {
        return (
            <ScrollToBottom className="body-container" >
                <div className="placeholder" style={{ height: '15vh' }} />
                <div className="timeline">
                    {!this.state.timeline
                        ? <p style={{ textAlign: 'center', margin: 'auto' }}></p>
                        : this.state.timeline.map((tweet) =>
                            <Message
                                key={tweet.id}
                                time={tweet.time}
                                id={tweet.id}
                                text={tweet.text}
                                name={tweet.name}
                                profile_picture={tweet.profile_picture}
                                likes={tweet.likes}
                                liked={tweet.liked}
                            />
                        )
                    }
                </div>
                <div className="scroll-check">
                    <div className="loading" style={{ marginTop: '1rem', marginLeft: '1rem', display: 'none' }}>
                        <TweetProfilePicture name='repeat' url={LoadingProfilePicture} repeat='no-repeat' diameter={40} />
                        <img src={Loading1} style={{ height: '3.7rem', marginLeft: '3.7px' }} alt='Loading icons' />
                    </div>
                </div>
            </ScrollToBottom>
        )
    }
}

export default Body
