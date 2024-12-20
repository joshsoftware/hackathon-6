import React, { useState, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

interface CsvUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<CsvUploaderProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const errorMessage = fileRejections
      .map(() => `Given file is not a valid CSV file.`)
      .join("\n");
    setError(errorMessage);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full h-48 p-4 border-2 border-dashed rounded-lg 
        ${
          isDragActive
            ? "bg-blue-50 border-blue-500"
            : "bg-gray-50 border-gray-300"
        } 
        cursor-pointer hover:bg-gray-100 transition`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop the CSV file here...</p>
        ) : (
          <p className="text-gray-600">
            Drag and drop a CSV file here, or{" "}
            <span className="text-blue-500 font-medium">
              Click To Select One
            </span>
          </p>
        )}
      </div>
      {error && (
        <div className="mt-2 text-red-600 font-medium">
          <p>{error}</p>
        </div>
      )}
      {selectedFile && (
        <div className="mt-2 text-gray-600">
          <p>Selected File: {selectedFile.name}</p>
          <p>Size: {Math.round(selectedFile.size / 1024)} KB</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
