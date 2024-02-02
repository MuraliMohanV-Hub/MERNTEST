import { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

function UploadCompanies() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('csvFile', selectedFile);
    try {
      await axios.post("http://localhost:8500/api/uploadcompanies", formData);
      console.log("File Uploaded Successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
    
 

  return (
    <div className="upload-container">
    <form onSubmit={handleSubmit}>
      <label htmlFor="fileInput">INSERT FILE : </label>
      <input type='file' id="fileInput" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button type='submit'>Upload</button>
    </form>
 
  </div>
  );
}

export default UploadCompanies;