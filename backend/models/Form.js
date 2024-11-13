const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

// Notes for Student
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
    options : [
        {
            field : {
                type : String,
            },
            votes : {
                // For calculating the percentage
                // Storing total count too for calculating it
                type : Number,
            }
        }
    ],

    // Adding feature such that one user can vote at max only one time
    // There is a need for this field , in all forms
    totalVote : {
        type : Number,
        default : 0
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Forms", formSchema);
