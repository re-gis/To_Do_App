const todoModel = require("../models/todo.model");

const createTodo = async (req, res) => {
  try {
    const { description, title, user } = req.body;
    if (!description || !title)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const newTodo = new todoModel({
      title,
      description,
      user: user,
    });

    const savedTodo = await newTodo.save();
    return res.status(200).json(savedTodo);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error..." });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find({ user: req.params.user });
    if (todos.length === 0) return res.send({ message: "Not Todo found!" });

    return res.status(201).send({ todos });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error..." });
  }
};

const getOneTodo = async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id);
    if (!todo)
      return res
        .status(403)
        .send({ message: "Todo " + `${req.params.id}` + "not found!" });

    return res.status(201).send({ todo });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error..." });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id);
    if (!todo)
      return res
        .status(403)
        .send({ message: `Todo ${req.params.id} not found!` });
    const desc = req.body.desc ? req.body.desc : todo.description;
    const title = req.body.title ? req.body.title : todo.title;

    const updatedTodo = await todoModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description: desc,
      },
      { new: true }
    );

    return res.status(201).send({ updatedTodo });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error..." });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id);
    if (!todo) return res.send({ message: `Todo ${req.params.id} not found!` });
    await todoModel.findByIdAndDelete(req.params.id);
    return res.status(201).send({ message: `Todo ${req.params.id} deleted!` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error..." });
  }
};

const deleteAll = async (req, res) => {
  try {
    const deleted = await todoModel.deleteMany({});
    if (!deleted)
      return res.status(500).send({ message: "Internal server error..." });
    return res.status(201).send({ message: "Todos deleted!" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error..." });
  }
};

const updateTodoComplete = async (req, res) => {
  try {
    const complete = req.body.complete;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      req.params.id,
      {
        completed: complete,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    return res.status(201).send({ updatedTodo });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error..." });
  }
};

const deleteComplete = async (req, res) => {
  try {
    const todoToDelete = await todoModel.findOne({ completed: true });
    if (!todoToDelete)
      return res.status(403).send({ message: "No completed todo!" });
    const deletedTodos = await todoModel.deleteMany({ completed: true });
    if (!deletedTodos)
      return res.status(500).send({ message: "Error occurred!" });
    return res.status(201).send({ message: "Completed todos deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error..." });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getOneTodo,
  updateTodo,
  deleteTodo,
  deleteAll,
  updateTodoComplete,
  deleteComplete,
};
