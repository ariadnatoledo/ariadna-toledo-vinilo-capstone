import { useState } from "react";

function FileUploader({ submit }) {
  const [file, setFile] = useState();
  const [content, setContent] = useState("");

  const handleFileChange = (e) => {
    console.log("Selected file:", e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleContentChange = (e) => {
    console.log("Content entered:", e.target.value);
    setContent(e.target.value);
  };

  return (
    <form onSubmit={(e) => submit(e, file, content)}>
      <input
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

