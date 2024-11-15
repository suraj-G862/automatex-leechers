const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    formName: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
         {
          type: String,
         }
    ],
    votes: [
      {
        type: Number,
        default: [] 
      },
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Forms", formSchema);
