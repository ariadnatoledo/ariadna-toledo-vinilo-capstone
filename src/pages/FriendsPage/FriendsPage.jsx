import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FriendsPage.scss";

const FriendsPage = ({ loggedInUserId }) => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`http://localhost:3306/friends/${loggedInUserId}`);
      console.log(response.data)
      setFriends(response.data);
    } catch (err) {
      console.error("Error fetching friends:", err);
      setError("Failed to load friends.");
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [loggedInUserId]);

  const handleMessage = (friendUsername) => {
    navigate(`/messages/${friendUsername}`);
  };

  return (
    <div className="friends-page">
      <h2>My Friends</h2>
      {error && <p className="error">{error}</p>}
      {friends.length === 0 ? (
        <p>No friends found.</p>
      ) : (
        <ul className="friends-list">
          {friends.map((friend) => (
            <li key={friend.userId} className="friend-item">
              <span className="friend-username">{friend.username}</span>
              <button
                className="message-button"
                onClick={() => handleMessage(friend.username)}
              >
                Message
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsPage;

