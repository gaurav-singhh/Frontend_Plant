import React, { useState } from "react";
import ImageUploader from "./ImageUploader";

function App() {
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Added to store image URL

  const handleUploadSuccess = (data, imageUrl) => {
    setResult(data); // Store the entire result including class_number and class_name
    setImageUrl(imageUrl); // Save the image URL for display
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 via-green-100 to-white p-8">
      <h1 className="text-5xl font-extrabold text-green-800 mb-12 drop-shadow-lg">
        🌿 Plant Disease Detector
      </h1>

      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-6 space-y-8 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
        <ImageUploader onUploadSuccess={handleUploadSuccess} />
      </div>

      {imageUrl && (
        <div className="mt-10 w-full max-w-lg bg-white shadow-xl rounded-xl p-6 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
          <img
            src={imageUrl}
            alt="Uploaded Leaf"
            className="w-full h-auto rounded-lg shadow-lg border-2 border-green-300 mb-6"
          />
        </div>
      )}

      {result && (
        <div className="mt-10 w-full max-w-md bg-white shadow-xl rounded-2xl p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Prediction
          </h2>

          <p className="text-green-600 mb-4 text-lg font-medium whitespace-pre-wrap break-words">
            <strong>Class Name:</strong> {result.class_name}
          </p>
          <p className="text-gray-600 text-sm">
            Confidence:{" "}
            <span className="font-bold text-green-700">
              {(result.confidence * 100).toFixed(2)}%
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
