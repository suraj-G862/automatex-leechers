import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VoteModal({ form, onClose }) {
  const arr = new Array(form.options.length).fill(0);
  const [votes, setVotes] = useState(() => (form.votes.length === 0 ? arr : form.votes));
  const [displayVotes, setDisplayVotes] = useState(() => (form.votes.length === 0 ? arr : form.votes));
  const [myVote, setMyVote] = useState(arr);
  const [votedIndex, setVotedIndex] = useState(null);
  const [initialIndex, setInitialIndex] = useState(null);

  useEffect(() => {
    if (form.userVoteIndex !== undefined) {
      setVotedIndex(form.userVoteIndex);
      setInitialIndex(form.userVoteIndex);
    }
  }, [form]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.post("http://localhost:3500/form/fetchVotes", {
          formId: form._id,
        });
        setVotes(response.data.votes);
        setDisplayVotes(response.data.votes);
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };
    fetchVotes();
  }, [form._id]);

  useEffect(() => {
    const arr = votes.map((vote, index) => vote + myVote[index]);
    setDisplayVotes(arr);
  }, [myVote, votes]);

  const handleVote = (index) => {
    const newVotes = [...myVote];
    if (votedIndex !== null && votedIndex !== index) {
      newVotes[votedIndex]--;
    }
    if (votedIndex === index) {
      newVotes[index]--;
      setVotedIndex(null);
    }
    newVotes[index]++;
    setMyVote(newVotes);
    setVotedIndex(index);
  };

  const handleClearVote = () => {
    if (votedIndex !== null) {
      const newVotes = [...myVote];
      newVotes[votedIndex]--;
      setMyVote(newVotes);
      setVotedIndex(null);
    }
  };

  const handleClose = async () => {
    const arr = votes.map((vote, index) => vote + myVote[index]);
    setVotes(arr);
    if (votedIndex !== initialIndex) {
      try {
        await axios.post("http://localhost:3500/form/vote", {
          formId: form._id,
          updatedVotes: arr,
        });
      } catch (error) {
        console.error("Error submitting vote:", error);
      }
    }
    onClose();
  };

  const totalVotes = displayVotes.reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-2">{form.formName}</h2>
        <p className="text-gray-700 mb-4">{form.question}</p>

        <div className="space-y-2">
          {form.options.map((option, index) => {
            const votePercentage = totalVotes > 0 ? (displayVotes[index] / totalVotes) * 100 : 0;
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

        {votedIndex !== null && (
          <button
            onClick={handleClearVote}
            className="mt-4 px-2 py-2 text-red-600 rounded-lg"
          >
            Clear Selection
          </button>
        )}
      </div>
    </div>
  );
}

export default VoteModal;
