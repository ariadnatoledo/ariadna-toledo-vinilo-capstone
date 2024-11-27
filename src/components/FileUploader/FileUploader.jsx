import { useState, useRef } from "react";

function FileUploader({ submit }) {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const fileInputRef = useRef(); 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    await submit(e, file, content); 
    setFile(null); 
    setContent(""); 
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={fileInputRef} 
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <textarea
        placeholder="Enter your content"
        value={content}
        onChange={handleContentChange}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileUploader;

