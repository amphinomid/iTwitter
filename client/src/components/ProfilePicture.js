
function ProfilePicture(props) {
    return (
        <img
            src={props.url}
            style={{
                width: props.diameter,
                height: props.diameter,
                borderRadius: '50%',
                borderStyle: 'solid',
                borderWidth: '0.1px',
                borderColor: 'white',
                position: 'absolute',
                marginLeft: (props.numFriends - 1 - props.index) * (props.parentWidth - props.diameter) / (props.numFriends - 1)
            }}
            alt={props.name}
        />
    )
}

export default ProfilePicture