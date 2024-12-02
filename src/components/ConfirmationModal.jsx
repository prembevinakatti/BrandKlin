import React from 'react';

const ConfirmationModal = ({ task, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the task: <strong>{task.title}</strong>?
        </p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
