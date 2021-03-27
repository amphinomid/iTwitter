import GrayMessage from './GrayMessage'
import BlueMessage from './BlueMessage'
const OWN_NAME = '_anli'

function Message(props) {
    if (props.name === OWN_NAME) {
        return (
            <BlueMessage
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