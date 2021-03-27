import GrayMessage from './GrayMessage'
import BlueMessage from './BlueMessage'
const OWN_NAME = '_anli'

function Message(props) {
    if (props.name === OWN_NAME) {
        return (
            <BlueMessage
                key={props.key}
                time={props.time}
                id={props.id}
                text={props.text}
                name={props.name}
                profile_picture={props.profile_picture}
                likes={props.likes}
                liked={props.liked}
            />
        )
    } else {
        return (
            <GrayMessage
                key={props.key}
                time={props.time}
                id={props.id}
                text={props.text}
                name={props.name}
                profile_picture={props.profile_picture}
                likes={props.likes}
                liked={props.liked}
            />
        )
    }
}

export default Message