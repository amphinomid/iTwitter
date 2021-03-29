import RepeatProfilePicture from '../assets/repeat_profile_picture.png'

function TweetProfilePicture(props) {
    return (
        <img
            src={
                props.repeat === 'repeat'
                ? RepeatProfilePicture
                : props.url
            }
            style={{
                width: props.diameter,
                height: props.diameter,
                borderRadius: '50%',
            }}
            alt={props.name}
        />
    )
}

export default TweetProfilePicture