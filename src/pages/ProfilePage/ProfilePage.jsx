import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FileUploader from "../../components/FileUploader/FileUploader"; 
import FollowStats from "../../components/FollowStats/FollowStats";
import "./ProfilePage.scss";

function ProfilePage({ user, loggedInUserId }) {
  const [posts, setPosts] = useState([]);
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

  const handleSubmitPost = async (e, file, content) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("content", content);
    formData.append("userId", user.userId);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("http://localhost:3306/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPosts((prevPosts) => [
        ...prevPosts,
        {
          postId: response.data.postId,
          userId: user.userId,
          content,
          image: response.data.image,
          createdAt: new Date().toISOString(),
        },
      ]);

      alert("Post created successfully!");
    } catch (err) {
      console.error(err.response?.data?.message || "Error creating post");
      alert("Failed to create post");
    }
  };

  const handlePostUpdate = (postId, updatedContent) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, content: updatedContent } : post
      )
    );
  };

  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
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
              <FollowStats userId={user.userId} />
              <div className="profile-page__actions">
                <button
                  onClick={handleSendMessage}
                  className="profile-page__message"
                >
                  Message
                </button>
              </div>
            </div>
          </div>

          <div className="profile-page__form">
            <h3 className="profile-page__form-title">Create a New Post</h3>
            <FileUploader submit={handleSubmitPost} />
          </div>

          <h3 className="profile-page__posts-title">{user.username}'s Posts</h3>
          <ul className="profile-page__posts">
            {posts.map((post) => (
              <li key={post.postId} className="profile-page__post-item"
              onClick={() => navigate(`/post/${post.postId}`)} 

              >
                <img
                  className="profile-page__post-image"
                  src={`http://localhost:3306${post.image}`}
                  alt="Post"
                />
                {/* <p className="profile-page__post-content">{post.content}</p> */}
                {/* <p className="profile-page__post-date"> */}
                  {/* {new Date(post.createdAt).toLocaleString()} */}
                {/* </p> */}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ProfilePage;


