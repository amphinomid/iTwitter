import React from 'react'
import './Header.css'
import HeaderProfilePicture from './HeaderProfilePicture'

function Header() {
    const [friends, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/friends", {method: 'GET'})
            .then((res) => res.json())
            .then((friends) => setData(friends.message));
    }, []);

    return (
        <div className="header-container">
            <div className="profile-pictures-container">
                {!friends // Forgot flex-direction: 'row-reverse' was a thing 🤪 optionally fix later
                    ? <p style={{ textAlign: 'center', margin: 'auto' }}><i>loading</i></p>
                    : friends.map((friend, index) =>
                        <HeaderProfilePicture
                            key={index}
                            index={index}
                            name={friend.name}
                            url={friend.profile_picture}
                            diameter={60}
                            numFriends={friends.length}
                            parentWidth={document.getElementsByClassName("profile-pictures-container")[0].clientWidth}
                        />
                    )
                }
            </div>
            {friends &&
                <p style={{ textAlign: 'center', fontSize: '0.75rem' }}>
                    {friends.length} People
                </p>
            }
        </div>
    )
}

export default Header
