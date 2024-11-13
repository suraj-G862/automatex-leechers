import React, { useState } from 'react';

function VoteModal({ form, onClose }) {
  const [votes, setVotes] = useState(form.votes);
  const [votedIndex, setVotedIndex] = useState(null);

  const totalVotes = votes.reduce((a, b) => a + b, 0);

  const handleVote = (index) => {
    const newVotes = [...votes];

    if (votedIndex !== null && votedIndex !== index) {
      // Decrease vote count of the previous selection
      newVotes[votedIndex]--;
    }

    // Increase vote count of the new selection
    newVotes[index]++;
    setVotes(newVotes);
    setVotedIndex(index);
  };

  const handleClearVote = () => {
    if (votedIndex !== null) {
      const newVotes = [...votes];
      // Decrease vote count for the previously selected option
      newVotes[votedIndex]--;
      setVotes(newVotes);
      setVotedIndex(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close button at the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-2">{form.formName}</h2>
        <p className="text-gray-700 mb-4">{form.question}</p>
        
        <div className="space-y-2">
          {form.options.map((option, index) => {
            const votePercentage = totalVotes > 0 ? (votes[index] / totalVotes) * 100 : 0;
            return (
              <div key={index} className="flex items-center justify-between">
                <button
                  onClick={() => handleVote(index)}
                  className={`mr-2 text-left w-full ${votedIndex === index ? 'text-blue-600 font-semibold' : ''}`}
                >
                  {option}
                </button>
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500"
                    style={{ width: `${votePercentage}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-700">{Math.round(votePercentage)}%</span>
              </div>
            );
          })}
        </div>
        
        {/* Clear Selection Button */}
        {votedIndex !== null && (
          <div>
          <button
            onClick={handleClearVote}
            className="mt-4 px-2 py-2 text-red-600 rounded-lg"
          >
            Clear Selection
          </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default VoteModal;
