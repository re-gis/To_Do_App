const mongoose = require("mongoose");
const model = mongoose.Schema;
const { User } = require("../models/user.model");

const Todo = new model(
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
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ToDo", Todo);
