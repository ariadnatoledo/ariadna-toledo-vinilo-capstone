import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PostActions from "../../components/PostActions/PostActions";
import "./PostDetails.scss";
import CommentsSection from "../CommentsSection/CommentsSection";

function PostDetails({ details }) {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3306/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post:", err.response?.data || err.message);
        alert("Failed to load the post.");
      }
    };

    fetchPost();
  }, [id]);

  const handlePostUpdate = (updatedContent) => {
    setPost((prevPost) => ({ ...prevPost, content: updatedContent }));
  };

  const handlePostDelete = () => {
    navigate("/profile"); 
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-details">
      <div className="post-details__image">
        <img src={`http://localhost:3306${post.image}`} alt="Post" />
      </div>
      <div className="post-details__content">
        <p>{post.content}</p>
        <PostActions
          postId={post.postId}
          currentContent={post.content}
          onUpdate={(_, updatedContent) => handlePostUpdate(updatedContent)}
          onDelete={handlePostDelete}
        />
      </div>

      <div className="post-details__comments">
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.text}</p>
              <small>By {comment.username}</small>
            </li>
          ))}
        </ul>
      </div>
      {/* Remember to check the below comment section */}
      <CommentsSection postId={post.postId} userId={post.userId} />
    </div>
  );
}

export default PostDetails;
