import React, { useState } from 'react';

function FormModal({ onClose, onSubmit }) {
  const [formName, setFormName] = useState('');
  const [creator, setCreator] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOptionField = () => setOptions([...options, '']);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ formName, creator, question, options, votes: new Array(options.length).fill(0) });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Form Name:</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Creator:</label>
            <input
              type="text"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Question:</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Options:</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                className="w-full border rounded px-3 py-2 mb-2"
              />
            ))}
            <button
              type="button"
              onClick={addOptionField}
              className="text-blue-500 underline"
            >
              Add Option
            </button>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
