const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ToDo", Todo);
