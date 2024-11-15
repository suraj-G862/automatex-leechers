import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

function LostFound() {
  const { user } = useContext(UserContext);
  const [lost, setLost] = useState([]);
  useEffect(() => {
    axios
      .get("https://automatex-leechers.onrender.com/LostFound/list")
      .then((res) => setLost(res.data))
      .catch((err) => console.log(err));
    console.log("LostFound");
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ ItemName: "", Description: "", ContactInfo: "", AddedBy: user._id });

  const handleRemove = async (_id, AddedBy) => {
    console.log(_id);
    if (AddedBy !== user._id) {
      toast.error("Unauthorized");
      return;
    }
    setLost((prev) => prev.filter((item) => item._id !== _id));
    try {
      await axios.delete(`https://automatex-leechers.onrender.com/LostFound/remove/${_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewItem({ ItemName: "", Description: "", ContactInfo: "", AddedBy: user._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://automatex-leechers.onrender.com/LostFound/add", newItem);
      toast.success("Item added successfully");
      setLost((prev) => [...prev, newItem]);
      handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  };

  const displayCard = (ItemName, Description, ContactInfo, _id, AddedBy) => {
    return (
      <tr key={_id} className="border-b border-gray-300">
        <td className="px-4 py-2">{ItemName}</td>
        <td className="px-4 py-2">{Description}</td>
        <td className="px-4 py-2">{ContactInfo}</td>
        <td className="px-4 py-2 text-center">
          <button onClick={() => handleRemove(_id, AddedBy)} className="text-red-500 hover:text-red-700">
            <span className="text-2xl">➖</span>
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-gray-200 p-8 rounded-xl shadow-lg w-full h-full">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Lost and Found
      </h2>
      <button
        onClick={handleAddItem}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-4 hover:bg-gray-800"
      >
        Add Item <span className="text-green-500 text-lg">+</span>
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Item Lost</th>
              <th className="px-4 py-2 text-left">Item Description</th>
              <th className="px-4 py-2 text-left">Contact Information</th>
              <th className="px-4 py-2 text-center">Remove Item</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 text-gray-900">
            {lost.map((data) => displayCard(data.ItemName, data.Description, data.ContactInfo, data._id, data.AddedBy))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Item Lost</label>
                <input
                  type="text"
                  value={newItem.ItemName}
                  onChange={(e) => setNewItem({ ...newItem, ItemName: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Item Description</label>
                <input
                  type="text"
                  value={newItem.Description}
                  onChange={(e) => setNewItem({ ...newItem, Description: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Contact Information</label>
                <input
                  type="text"
                  value={newItem.ContactInfo}
                  onChange={(e) => setNewItem({ ...newItem, ContactInfo: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LostFound;
