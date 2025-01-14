import React, { useState } from "react";
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

  const onDropRejected = (fileRejections: FileRejection[]) => {
    const errorMessage = fileRejections[0].errors[0].message;
    console.log("Error while uploading file: ", errorMessage);
    setError("Please upload a valid xlsx file.");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full h-32 p-6 border-4 rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${isDragActive
          ? "bg-neon-green animate-neon-glow"
          : "bg-neon-blue hover:bg-neon-light-blue"
          }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-neon-pink font-semibold text-lg">Drop the XLSX file here...</p>
        ) : (
          <p className="text-neon-yellow font-medium text-md">
            Drag and drop a xlsx file here, or{" "}
            <span className="text-blue-500 font-semibold">Click To Select One</span>
          </p>
        )}
      </div>
      {selectedFile && (
        <div className="mt-4 text-green-500">
          <p className="font-medium">Selected File: <span className="font-semibold">{selectedFile.name}</span></p>
          <p className="text-sm">Size: {Math.round(selectedFile.size / 1024)} KB</p>
        </div>
      )}
      {error && (
        <p className="mt-2 text-red-500 text-sm font-semibold">{error}</p>
      )}
    </div>
  );
};

export default FileUploader;
