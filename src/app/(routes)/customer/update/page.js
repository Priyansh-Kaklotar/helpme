"use client";
import { useState } from "react";
import axios from "axios";

export default function ProfilePicUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // Preview before upload
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      const res = await axios.post("/api/upload-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setUploadedUrl(res.data.url);
        alert("Uploaded successfully!");
      } else {
        alert("Upload failed!");
      }
    } catch (err) {
      // console.error(err);
      alert("Upload error");
    } finally {
      setUploading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div
      className="w-full max-w-sm mx-auto p-6 rounded-2xl
                    bg-gradient-to-br from-purple-100 to-indigo-50
                    dark:from-purple-900 dark:to-indigo-800
                    shadow-xl border border-white/10"
    >
      <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-200 mb-4 text-center">
        Update Profile Picture
      </h3>

      <label
        htmlFor="profile-upload"
        className="w-full flex flex-col items-center gap-3 cursor-pointer"
      >
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center
                     bg-white/60 dark:bg-white/10 shadow-md"
          aria-hidden
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : uploadedUrl ? (
            <img
              src={uploadedUrl}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-center px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-purple-600 dark:text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16V8a4 4 0 014-4h2a4 4 0 014 4v8M7 16h10"
                />
              </svg>
              <span className="text-xs text-purple-700 dark:text-purple-200 mt-1">
                Click to choose
              </span>
            </div>
          )}
        </div>
      </label>

      <div className="mt-4 flex gap-3 justify-center">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="px-4 py-2 rounded-full text-white font-medium
                     bg-gradient-to-r from-purple-600 to-indigo-600
                     hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 transition"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        <button
          onClick={clearSelection}
          type="button"
          className="px-4 py-2 rounded-full bg-white/90 dark:bg-white/10 text-sm text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10 transition"
        >
          Clear
        </button>
      </div>

      {uploadedUrl && (
        <div className="mt-5 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
            Uploaded Image
          </p>
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-purple-200 dark:ring-purple-700">
            <img
              src={uploadedUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
