import React, { useState } from 'react';
import axios from 'axios';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from './firebase';

const FileUploadForm = () => {
  const [file, setFile] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    const token = await getAuth(app).currentUser?.getIdToken()

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload File</button>
    </form>
  );
};

function App() {
  return (
    <div className="App">
      <FileUploadForm />
      <button onClick={() => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
        }}>Sign in with google</button>
    </div>
  );
}

export default App;
