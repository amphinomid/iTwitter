import React from 'react'
import './Body.css'
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom';

var initial_load = 0;
var last_scroll = 0;

class Body extends React.Component {
    // Temporary
    // const [home_timeline, setData] = React.useState(null);
    // React.useEffect(() => {
    //     fetch("/home_timeline")
    //         .then((res) => res.json())
    //         .then((home_timeline) => setData(home_timeline.message));
    //     window.addEventListener('scroll', check_scroll, true);
    //     return () => window.removeEventListener('scroll', check_scroll, true);
    // }, []);

    constructor(props) {
        super(props);
        this.state = {
            timeline: []
        };
    }

    check_scroll() {
        var scroll_check_rect = document.getElementsByClassName("scroll-check")[0].getBoundingClientRect();
        var send_tweet_padding_rect = document.getElementsByClassName("send-tweet-padding")[0].getBoundingClientRect();
        if (scroll_check_rect.bottom <= last_scroll && Math.abs(scroll_check_rect.bottom - send_tweet_padding_rect.top) < 5) {
            if (initial_load++ > 1) {
                this.update_timeline();
            }
        }
        last_scroll = scroll_check_rect.bottom;
    }

    update_timeline() {
        console.log('Updating timeline...');
        fetch("/home_timeline")
            .then((res) => res.json())
            .then((home_timeline) => this.setState({ timeline: home_timeline.message }));
    }

    render() {
        this.update_timeline();
        return (
            <ScrollToBottom className="body-container" >
                <div className="placeholder" />
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
                <div className="scroll-check" />
            </ScrollToBottom>
        )
    }
}

export default Body
