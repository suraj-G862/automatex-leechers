const mongoose = require("mongoose");

const LostAndFoundSchema = new mongoose.Schema(
  {
    ItemName: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    ContactInfo: {
      type: String,
      required: true,
    },
    AddedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LostAndFound", LostAndFoundSchema);
