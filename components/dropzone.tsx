import { useDropzone } from "react-dropzone";

export function Dropzone({
  onDrop,
  accept,
}: {
  onDrop: (files: File) => void;
  accept: string;
}) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles[0]); // Only take the first file
      }
    },
    accept: { accept: [] }, // Only allow images
    multiple: false, // Prevent multiple file selection
  });

  return (
    <div
      {...getRootProps()}
      className="p-6 max-w-56 border-dashed border-2 border-gray-400 rounded-md text-center cursor-pointer hover:border-gray-600 transition bg-gray-50"
    >
      <input {...getInputProps()} />
      <p className="text-gray-700">
        Drag & drop images here or click to select
      </p>
    </div>
  );
}
// image/*
