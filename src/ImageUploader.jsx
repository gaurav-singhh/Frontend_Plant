import React, { useState } from "react";
import { ClipLoader } from "react-spinners"; // Import the spinner from react-spinners

function ImageUploader({ onUploadSuccess }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Added for preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Set the image URL for preview
      setError(null);
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
        onUploadSuccess(result);
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err) {
      setLoading(false);
      setError("Error uploading the image.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Upload a Leaf Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg file:mr-2"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        {imageUrl && !loading && (
          <div className="mt-4">
            <img
              src={imageUrl}
              alt="Leaf Preview"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Spinner displayed during upload or prediction */}
        {loading && (
          <div className="flex justify-center mt-6">
            <ClipLoader color="#36d7b7" loading={loading} size={50} />
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition duration-300 ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Analyze Leaf"}
        </button>
      </form>
    </div>
  );
}

export default ImageUploader;
