import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.scss";

function ProfilePage({ user }) {
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3306/users/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (err) {
        console.error(err.response?.data?.message || "Error fetching posts");
      }
    };

    if (token) {
      getPosts();
    }
  }, [user.userId]);

  const handleSendMessage = () => {
    navigate(`/profile/${user.username}/messages`);
  };

  const handleFollow = () => {
    setFollowers((prev) => prev + 1); // Increment followers count
  };

  return (
    <div className="profile-page">
      {user.userId && (
        <>
          <div className="profile-page__header">
            <img
              className="profile-page__avatar"
              src={`http://localhost:3306${user.avatar}`}
              alt={user.username}
            />
            <div className="profile-page__info">
              <h2>{user.username}</h2>
              <p className="profile-page__bio">{user.bio}</p>
              <div className="profile-page__actions">
                <button className="profile-page__follow" onClick={handleFollow}>
                  Follow
                </button>
                <span className="profile-page__followers">
                  {followers} Followers
                </span>
                <button
                  className="profile-page__message"
                  onClick={handleSendMessage}
                >
                  Message
                </button>
              </div>
            </div>
          </div>
          <h3 className="profile-page__posts-title">{user.username}'s Posts</h3>
          <ul className="profile-page__posts">
            {posts.map((post) => (
              <li key={post.id} className="profile-page__post-item">
                <h4 className="profile-page__post-title">{post.title}</h4>
                <p className="profile-page__post-body">{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ProfilePage;


