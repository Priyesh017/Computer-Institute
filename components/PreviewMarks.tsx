import { PreviewModalProps } from "@/lib/typs";

export const PreviewModal = ({
  isOpen,
  onClose,
  subjects,
  totalMarks,
  percentage,
  grade,
  result,
}: PreviewModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-screen bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Preview
          </h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition"
          >
            Close
          </button>
        </div>

        {/* Scrollable JSON Preview */}
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded text-sm overflow-y-auto max-h-[300px] mt-4">
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(subjects, null, 2)}
          </pre>
        </div>

        {/* Additional Info */}
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          <strong>Grand Total:</strong> {totalMarks}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Percentage:</strong> {percentage}%
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Grade:</strong> {grade}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Result:</strong> {result}
        </p>
      </div>
    </div>
  );
};
