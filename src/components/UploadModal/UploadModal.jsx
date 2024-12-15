import React, { useState } from "react";
import "./UploadModal.scss";

function UploadModal({ isOpen, onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isOpenToTrade, setIsOpenToTrade] = useState(false);

  const handleUpload = () => {
    if (!file || !caption) {
      alert("Please choose a file and write a caption!");
      return;
    }

    const postData = {
      file,
      caption,
      isOpenToTrade,
    };

    onUpload(postData); 
    onClose(); 
  };

  return (
    isOpen && (
      <div className="upload-modal">
        <div className="upload-modal__content">
          <h2>Upload Photo</h2>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="upload-modal__file-input"
          />
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="upload-modal__textarea"
          />
          <div className="upload-modal__controls">
            <button className="upload-modal__upload-btn" onClick={handleUpload}>
              Upload
            </button>
            <div className="upload-modal__toggle">
              <label>
                <input
                  type="checkbox"
                  checked={isOpenToTrade}
                  onChange={() => setIsOpenToTrade(!isOpenToTrade)}
                />
                Open to Trade
              </label>
            </div>
            <button className="upload-modal__cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default UploadModal;
