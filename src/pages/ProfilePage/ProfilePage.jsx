import { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.scss";

function ProfilePage({ user }) {
  const [posts, setPosts] = useState([]);

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
        console.error(err.response.data.message);
      }
    };

    if (token) {
      getPosts();
    }
  }, [user.userId]);

  return (
    <div className="profile-page">
      {user.userId && (
        <>
          <h2 className="profile-page__title">Profile</h2>
          <h3 className="profile-page__username">Welcome {user.userName}</h3>
          <img className="avatar" src={user.avatar} alt={user.userName} />
          <h3 className="profile-page__username">{user.userName}'s Posts</h3>
          <ul className="post-list">
            {posts.map((post) => (
              <li className="post-list__item" key={post.id}>
                <h4 className="post-list__title">{post.title}</h4>
                <p className="post-list__body">{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
