import { useState } from "react";
import axios from "axios";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import "./PostActions.scss"; 

function PostActions({ postId, currentContent, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(currentContent);

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3306/posts/${postId}`, { content: editedContent }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdate(postId, editedContent);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating post:", err.response?.data || err.message);
      alert("Failed to update post.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3306/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(postId); 
    } catch (err) {
      console.error("Error deleting post:", err.response?.data || err.message);
      alert("Failed to delete post.");
    }
  };

  return (
    <div className="post-actions">
      {isEditing ? (
        <div className="post-actions__edit">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button className="post-actions__save" onClick={handleEdit}>
            Save
          </button>
          <button className="post-actions__cancel" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="post-actions__buttons">
          <button className="post-actions__edit-btn" onClick={() => setIsEditing(true)}>
            <img src={editIcon} alt="Edit" />
          </button>
          <button className="post-actions__delete-btn" onClick={handleDelete}>
            <img src={deleteIcon} alt="Delete" />
          </button>
        </div>
      )}
    </div>
  );
}

export default PostActions;
