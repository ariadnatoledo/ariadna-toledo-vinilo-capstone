import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FollowStats.scss';

function FollowStats({ userId }) {
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    const fetchFollowData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:3306/users/${userId}/followers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowers(response.data.followers);
        setFollowing(response.data.following);
      } catch (err) {
        console.error('Error fetching follow data:', err.response?.data || err.message);
      }
    };

    fetchFollowData();
  }, [userId]);

  return (
    <div className="follow-stats">
      <div className="follow-stats__counts">
        <p>{followers} Followers</p>
        <p>{following} Following</p>
      </div>
    </div>
  );
}

export default FollowStats;
