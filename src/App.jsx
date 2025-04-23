import React, { useState } from "react";
import ImageUploader from "./ImageUploader";

function App() {
  const [result, setResult] = useState(null);

  const handleUploadSuccess = (data) => {
    setResult(data); // Save the prediction result
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        Plant Disease Detection
      </h1>
      <ImageUploader onUploadSuccess={handleUploadSuccess} />

      {result && (
        <div className="mt-8 p-6 bg-white shadow rounded-md">
          <h2 className="text-xl font-bold">Prediction: {result.prediction}</h2>
          <p className="text-gray-600">
            Confidence: {result.confidence.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
