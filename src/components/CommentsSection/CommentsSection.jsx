import React, { useState, useEffect } from "react";
import axios from "axios";
import { deleteIcon } from "../PostActions/PostActions"; 
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal"; 
import "./CommentsSection.scss";

function CommentsSection({ postId, userId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [commentToDelete, setCommentToDelete] = useState(null); 

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

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3306/posts/${postId}/comments`,
        { userId, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComments(); 
    } catch (error) {
      console.error("Error posting comment:", error.response?.data || error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3306/posts/${postId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error.response?.data || error.message);
      alert("Failed to delete comment.");
    }
  };

  const confirmDeleteComment = (commentId) => {
    setCommentToDelete(commentId); 
    setIsModalOpen(true); 
  };

  const handleConfirmDelete = async () => {
    if (commentToDelete) {
      await handleDeleteComment(commentToDelete);
      setCommentToDelete(null);
      setIsModalOpen(false); 
    }
  };

  const handleCancelDelete = () => {
    setCommentToDelete(null);
    setIsModalOpen(false); 
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.commentId} className="comment-item">
            <img
              src={`http://localhost:3306${comment.avatar}`}
              alt={comment.username || "User Avatar"}
              className="comment-avatar"
            />
            <div className="comment-content">
              <p>{comment.content}</p>
              <p>{new Date(comment.timestamp).toLocaleDateString("en-US")}</p>
              <button
                className="delete-comment-btn"
                onClick={() => confirmDeleteComment(comment.commentId)}
              >
                <img src={deleteIcon} alt="Delete Comment" />
              </button>
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
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default CommentsSection;
