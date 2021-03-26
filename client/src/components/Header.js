import React from "react"
import './Header.css'
import ProfilePicture from './ProfilePicture'

function Header() {
    const [friends, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/friends")
            .then((res) => res.json())
            .then((friends) => setData(friends.message));
    }, []);

    return (
        <div className="header-container">
            <div className="profile-pictures-container">
                {!friends
                 ? <p style={{ textAlign: 'center', margin: 'auto' }}>⌛</p>
                 : friends.map((friend, index) =>
                 <ProfilePicture
                    key={index}
                    index={index}
                    name={friend.name}
                    url={friend.profile_picture}
                    diameter={60}
                    numFriends={friends.length}
                    parentWidth={document.getElementsByClassName("profile-pictures-container")[0].clientWidth}
                 />)
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
