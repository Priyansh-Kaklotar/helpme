"use client";
import { useState } from "react";
import axios from "axios";

export default function ProfilePicUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // Preview before upload
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await axios.post("/api/upload-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.success) {
      setUploadedUrl(res.data.url);
      alert("Uploaded successfully!");
    } else {
      alert("Upload failed!");
    }
  };

  return (
    // aane update karsu pachi aa aapnu update page banse okkkkkk 
    <div className="flex flex-col items-center space-y-4"> 
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 rounded-full object-cover" />}
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Upload
      </button>

      {uploadedUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={uploadedUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
        </div>
      )}
    </div>
  );
}
