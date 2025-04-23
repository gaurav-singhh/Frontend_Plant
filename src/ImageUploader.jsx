import React, { useState } from "react";

function ImageUploader({ onUploadSuccess }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setError(null); // Reset any previous errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        "https://bakend-plant.onrender.com/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        onUploadSuccess(result); // Send the result to the parent component
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err) {
      setLoading(false);
      setError("Error uploading the image.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default ImageUploader;
