import React, { useState } from "react";
import FileUploader from "../../components/FileUploader";

const LandingScreen: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a CSV file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;

      // Split CSV into rows
      const rows = text.split("\n");

      // Assuming the first row contains headers (column names)
      const headers = rows[0].split(",").map((header) => header.trim()); // Trim headers

      // Parse the rest of the rows into objects
      const parsedData = rows.slice(1).map((row) => {
        const values = row.split(",");

        // Create an object for each row and assign headers to values
        const obj: { [key: string]: string } = {};

        headers.forEach((header, index) => {
          // Only assign if the value exists, otherwise assign an empty string or a default value
          const value = values[index]?.trim() || ""; // Handle undefined or missing values
          obj[header] = value;
        });

        return obj;
      });

      console.log("Parsed CSV Data:", parsedData);
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col items-center">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        File Uploader
      </h1>
      <FileUploader onFileSelect={handleFileSelect} />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Upload File
      </button>
    </div>
  );
};

export default LandingScreen;
