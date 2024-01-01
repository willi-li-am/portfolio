import React, { useState } from "react";
import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./firebase";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const auth = getAuth(app);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setFileName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", fileName);
    if (!auth.currentUser) {
      alert("User not authenticated");
      return;
    }
    const token = await auth.currentUser.getIdToken();

    try {
      const response = await axios.post(
        "http://localhost:8080/skills",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <input value={fileName} type="text" onChange={handleNameChange} />
      <button type="submit">Upload File</button>
    </form>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/admin"
        element={
          <div className="App">
            <FileUploadForm />
            <button
              onClick={() => {
                const auth = getAuth(app);
                const provider = new GoogleAuthProvider();
                signInWithPopup(auth, provider);
              }}
            >
              Sign in with google
            </button>
          </div>
        }
      ></Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
