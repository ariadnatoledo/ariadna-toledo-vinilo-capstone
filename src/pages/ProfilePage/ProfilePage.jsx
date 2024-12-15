import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import UploadModal from "./UploadModal";
import axios from "axios";
import uploadIcon from "../../assets/icons/upload-24px.svg";
import "./ProfilePage.scss";

function ProfilePage({ user }) {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getFriendsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3306/users/${user.userId}/followers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Followers API Response:", response.data);
        setFollowers(response.data.followers);
        setFollowing(response.data.following);
      } catch (err) {
        console.error("Error fetching followers and following data", err);
      }
    };

    if (token) {
      getFriendsData();
    }
  }, [user.userId]);

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("content", caption);
    formData.append("userId", user.userId);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3306/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPosts((prevPosts) => [
        ...prevPosts,
        {
          postId: response.data.postId,
          userId: user.userId,
          content: caption,
          image: response.data.image,
          createdAt: new Date().toISOString(),
        },
      ]);

      alert("Post created successfully!");
      setIsModalOpen(false);
      setSelectedFile(null);
      setCaption("");
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
              <div className="profile-page__username-stats">
                <h2 className="profile-page__username">{user.username}</h2>
                <div className="profile-page__follow-stats">
                  <div className="profile-page__follow-count">
                    <p>{followers}</p>
                    <span>Followers</span>
                  </div>
                  <div className="profile-page__follow-count">
                    <p>{following}</p>
                    <span>Following</span>
                  </div>
                </div>
              </div>
              <div className="profile-page__bio-upload">
                <div className="profile-page__bio">
                  <p>{user.bio}</p>
                </div>
                <div className="profile-page__upload">
                  <button
                    className="profile-page__upload-button"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <span className="profile-page__upload-text">Upload</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <div className="profile-page__modal">
              <div
                className="profile-page__modal-backdrop"
                onClick={() => setIsModalOpen(false)}
              ></div>
              <div className="profile-page__modal-content">
                <h3>Upload a Photo</h3>
                <form
                  className="profile-page__form"
                  onSubmit={handleSubmitPost}
                >
                  <div className="profile-page__form-group">
                    <label
                      htmlFor="file"
                      className="profile-page__upload-label"
                    >
                      Choose File
                    </label>
                    <input
                      type="file"
                      id="file"
                      className="profile-page__file-input"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    {selectedFile && (
                      <span className="profile-page__file-name">
                        {selectedFile.name}
                      </span>
                    )}
                  </div>
                  <textarea
                    className="profile-page__textarea"
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                  <div className="profile-page__form-actions">
                    <button
                      type="submit"
                      className="profile-page__upload-button"
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      className="profile-page__modal-close"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="profile-page__container">
            <div className="profile-page__posts">
              {posts.map((post) => (
                <li
                  key={post.postId}
                  className="profile-page__post-item"
                  onClick={() => navigate(`/post/${post.postId}`)}
                >
                  <img
                    className="profile-page__post-image"
                    src={`http://localhost:3306${post.image}`}
                    alt="Post"
                  />
                </li>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
  
}

export default ProfilePage;
