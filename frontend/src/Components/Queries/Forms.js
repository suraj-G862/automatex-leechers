import React, { useState } from 'react';
import FormModal from './FormModal';
import VoteModal from './VoteModal';

function Forms() {
  const [forms, setForms] = useState([{
    formName: "Arbaz",
    creator: "CSE",
    question: "+91 1",
    options: ["Arbaz", "Sachin"],
    votes: [1, 2],
  }]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const addForm = (form) => {
    setForms([...forms, form]);
  };

  const openVoteModal = (form) => {
    setSelectedForm(form);
    setIsVoteModalOpen(true);
  };

  const displayCard = (formName, creator, form) => {
    return (
      <tr className="border-b border-gray-300">
        <td className="px-4 py-2">{formName}</td>
        <td className="px-4 py-2">{creator}</td>
        <td className="px-4 py-2 text-center">
          <button onClick={() => openVoteModal(form)}  className="mt-2 bg-gray-900 text-white px-4 py-2 rounded" >
              Enter
          </button>
        </td>
      </tr>
    );
  };

  return (
    <main className="p-4">
       <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Forms
      </h2>
      <button
        onClick={() => setIsFormModalOpen(true)}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-4 hover:bg-gray-800"
      >
        Add a Form <span className="text-green-500 text-lg">+</span>
      </button>
      
      {isFormModalOpen && (
        <FormModal
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={addForm}
        />
      )}
      
      {isVoteModalOpen && selectedForm && (
        <VoteModal
          form={selectedForm}
          onClose={() => setIsVoteModalOpen(false)}
        />
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Form Name</th>
              <th className="px-4 py-2 text-left">Form By</th>
              <th className="px-4 py-2 text-center">See Details</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 text-gray-900">
            {forms.map((data) => displayCard(data.formName, data.creator, data))}
          </tbody>
        </table>
      </div>
       {/* /// */}
    </main>
  );
}

export default Forms;
