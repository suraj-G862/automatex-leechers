import React, { useState } from 'react';

function FormItem({ form }) {
  const [votes, setVotes] = useState(form.votes);
  const [votedIndex, setVotedIndex] = useState(null);

  const totalVotes = votes.reduce((a, b) => a + b, 0);

  const handleVote = (index) => {
    if (votedIndex === null) {
      const newVotes = [...votes];
      newVotes[index]++;
      setVotes(newVotes);
      setVotedIndex(index);
    }
  };

  const handleClearVote = () => {
    if (votedIndex !== null) {
      const newVotes = [...votes];
      newVotes[votedIndex]--;
      setVotes(newVotes);
      setVotedIndex(null);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-2">{form.formName}</h3>
      <p className="text-gray-700 mb-4">{form.question}</p>
      <div className="space-y-2">
        {form.options.map((option, index) => {
          const votePercentage = totalVotes > 0 ? (votes[index] / totalVotes) * 100 : 0;
          return (
            <div key={index} className="flex items-center">
              <button
                onClick={() => handleVote(index)}
                disabled={votedIndex !== null}
                className="mr-2 text-left w-full"
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
      {votedIndex !== null && (
        <button
          onClick={handleClearVote}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear Selection
        </button>
      )}
    </div>
  );
}

export default FormItem;
