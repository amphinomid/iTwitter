import GrayMessage from './GrayMessage'
import BlueMessage from './BlueMessage'
const OWN_NAME = '_anli'

function format_date(timestamp) {
    var date = new Date(timestamp);
    return date.toString().slice(0, 3) + ',' + date.toString().slice(3, 10);
}

function format_time(timestamp) {
    var date = new Date(timestamp);
    return ',' + date.toString().slice(15, 21);
}

function Message(props) {
    if (props.name === OWN_NAME) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {props.time !== 'repeat' &&
                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'white' }}>
                        <b>{ format_date(props.time) }</b>{ format_time(props.time) }
                    </p>
                }
                <BlueMessage
                    time={props.time}
                    id={props.id}
                    text={props.text}
                    name={props.name}
                    profile_picture={props.profile_picture}
                    likes={props.likes}
                    liked={props.liked}
                />
            </div>
        )
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {props.time !== 'repeat' &&
                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'white' }}>
                        <b>{ format_date(props.time) }</b>{ format_time(props.time) }
                    </p>
                }
                <GrayMessage
                    time={props.time}
                    id={props.id}
                    text={props.text}
                    name={props.name}
                    profile_picture={props.profile_picture}
                    likes={props.likes}
                    liked={props.liked}
                />
            </div>
        )
    }
}

export default Message