import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.scss";

function ProfilePage({ user }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", image: null });
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

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewPost({ ...newPost, image: e.target.files[0] });
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    console.log("Starting handleSubmitPost...");
    console.log("New post data:", newPost);

    
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    formData.append("image", newPost.image);

    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:3306/users/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Post creation response:", response.data);

      alert("Post created successfully!");
      setNewPost({ title: "", content: "", image: null });
      window.location.reload(); 
    } catch (err) {
      console.error(err.response?.data?.message || "Error creating post");
      alert("Failed to create post");
    }
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
                <button className="profile-page__follow">Follow</button>
                <button
                  onClick={handleSendMessage}
                  className="profile-page__message"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
          <form className="profile-page__form" onSubmit={handleSubmitPost}>
            <h3 className="profile-page__form-title">Create a New Post</h3>
            <input
              className="profile-page__form-input"
              type="text"
              name="title"
              value={newPost.title}
              onChange={handlePostChange}
              placeholder="Post Title"
              required
            />
            <textarea
              className="profile-page__form-textarea"
              name="content"
              value={newPost.content}
              onChange={handlePostChange}
              placeholder="What's on your mind?"
              required
            />
            <input
              className="profile-page__form-file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <button type="submit" className="profile-page__form-button">
              Post
            </button>
          </form>
          <h3 className="profile-page__posts-title">{user.username}'s Posts</h3>
          <ul className="profile-page__posts">
  {posts.map((post) => (
    <li key={post.postId} className="profile-page__post-item">
      <h4 className="profile-page__post-title">{post.title}</h4>
      <img
        className="profile-page__post-image"
        src={`http://localhost:3306${post.image}`}
        alt={post.title}
      />
      <p className="profile-page__post-content">{post.content}</p>
    </li>
  ))}
</ul>
        </>
      )}
    </div>
  );
}

export default ProfilePage;



