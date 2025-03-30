import { useDropzone } from "react-dropzone";

export function DropzoneMul({ onDrop }: { onDrop: (files: File[]) => void }) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="p-6 border-dashed border-2 border-gray-400 rounded-md text-center cursor-pointer hover:border-gray-600 transition bg-gray-50"
    >
      <input {...getInputProps()} />
      <p className="text-gray-700">
        Drag & drop images here or click to select
      </p>
    </div>
  );
}
