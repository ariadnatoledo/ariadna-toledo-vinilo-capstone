import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommentsSection.scss";

function CommentsSection({ postId, userId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3306/posts/${postId}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3306/posts/${postId}/comments`,
        { userId, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.commentId} className="comment-item">
            <img
              src={`http://localhost:3306${comment.avatar}`}
              alt={`${comment.username}`}
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
