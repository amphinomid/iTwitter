import './Message.css'

function Message(props) {
    return (
        <div style={{ color: 'white' }}>
            {props.profile_picture}
            {props.username}
            {props.text_content}
            {props.likes}
        </div>
    )
}

export default Message