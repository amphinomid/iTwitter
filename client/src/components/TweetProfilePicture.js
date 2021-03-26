
function TweetProfilePicture(props) {
    return (
        <img
            src={props.url}
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