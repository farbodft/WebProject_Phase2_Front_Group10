import React, { useState, useEffect } from 'react';
import './ProfileContainer.css';

const ProfileContainer = ({ imageSrc, following, role, bio, follower }) => {
    const [isFollowing, setIsFollowing] = useState(false); // Track if the user is following

    // Check if the user is already following when the component is mounted
    useEffect(() => {
        const checkFollowingStatus = async () => {
            try {
                console.log("Follower:", follower);
                console.log("Following:", following);

                // Fetch the followings of the current user (follower)
                const response = await fetch(`http://localhost:5004/api/profiles/players/followings/${follower}`);
                const data = await response.json();
                console.log("Fetched followings:", data); // Debugging line

                // If the player is already in the followings list, set the state to true
                if (data.followings && data.followings.includes(following)) {
                    setIsFollowing(true);
                }
            } catch (error) {
                console.error('Error checking followings:', error);
            }
        };

        if (follower && following) {
            checkFollowingStatus(); // Check follow status when component is mounted
        }

    }, [follower, following]);

    // Handle follow button click
    const handleFollow = async () => {
        try {
            console.log("Sending follow request for:", following);
            console.log("Follower:", follower);

            const response = await fetch(`http://localhost:5004/api/profiles/players/followings/${follower}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    following: following, // Send the name of the player to follow
                }),
            });

            // Check if the response is successful
            if (response.ok) {
                setIsFollowing(true);  // Set to true once the user follows
                console.log(`${follower} is now following ${following}`);
            } else {
                console.log('Error following user. Response not OK:', response.status);
                const errorDetails = await response.text();
                console.log('Error details:', errorDetails);
            }
        } catch (error) {
            console.error('Error while sending follow request:', error);
        }
    };

    return (
        <div className="profile-container">
            <a href="#" className="profile-trigger">
                <img src={imageSrc} alt={`Profile of ${following}`} className="profile-img" />
            </a>

            <div tabIndex="-1" className="profile-card">
                <header>
                    <img src={imageSrc} alt={`Profile of ${following}`} />
                    <h1>{following}</h1> {/* Display following name here */}
                    <h2>{role}</h2>
                </header>
                <div className="profile-bio">
                    <p>{bio}</p>
                </div>
                <button className="button button1" onClick={handleFollow}>
                    {isFollowing ? 'دنبال کرده' : 'دنبال کردن'}
                </button>
            </div>
        </div>
    );
};

export default ProfileContainer;
