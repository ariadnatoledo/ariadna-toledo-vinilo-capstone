import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommentsSection.scss";

function CommentsSection({ postId, userId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
 
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3306/posts/${postId}/comments`
      );
      console.log("Fetched comments:", response.data); 
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  useEffect(() => {
   
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    console.log("Attempting to post a comment...");
    console.log("Post ID:", postId);
    console.log("User ID:", userId);
    console.log("Content:", newComment);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3306/posts/${postId}/comments`,
        { userId, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCommentData = {
        ...response.data,
        avatar: response.data.avatar, 
        timestamp: response.data.timestamp || new Date().toISOString(), 
      content: response.data.content
    };

    fetchComments();

      console.log("New comment data:", newCommentData); 

    } catch (error) {
      console.error("Error posting comment:", error.response?.data || error.message);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <ul className="comments-list">
        {comments.map((comment, index) => (
          <li key={`${comment.commentId || index}`} className="comment-item">
            <img
              src={`http://localhost:3306${comment.avatar}`}
              alt={comment.username || "User Avatar"}
              className="comment-avatar"
            />
            <div className="comment-content">
              <p>{comment.content}</p>
              <p>{new Date(comment.timestamp).toLocaleDateString("en-US")}</p>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export default CommentsSection;

