// const todoModel = require("../models/todo.model");

// const createTodo = async (req, res) => {
//   try {
//     const { description, title } = req.body;
//     if (!description || !title)
//       return res.status(400).json({ msg: "Not all fields have been entered." });

//     const newTodo = new todoModel({
//       title,
//       description,
//     });

//     const savedTodo = await newTodo.save();
//     return res.status(200).json(savedTodo);
//   } catch (err) {
//     return res.status(500).send({ message: "Internal server error..." });
//   }
// };

// const getTodos = async (req, res) => {
//   try {
//     const todos = await todoModel.find();
//     if (todos.length === 0)
//       return res.status(403).send({ message: "Not Todo found!" });

//     return res.status(201).send({ todos });
//   } catch (error) {
//     return res.status(500).send({ message: "Internal server error..." });
//   }
// };

// const getOneTodo = async (req, res) => {
//   try {
//     const todo = await todoModel.findById(req.params.id);
//     if (todo.length === 0)
//       return res
//         .status(403)
//         .send({ message: "Todo" + `${req.params.id}` + "not found!" });

//     return res.status(201).send({ todo });
//   } catch (error) {
//     return res.status(500).send({ message: "Internal server error..." });
//   }
// };

// const updateTodo = async (req, res) => {
//   try {
//     const todo = await todoModel.findById(req.params.id);
//     if (!todo)
//       return res
//         .status(403)
//         .send({ message: `Todo ${req.params.id} not found!` });
//     const desc = req.body.desc ? req.body.desc : todo.description;
//     const title = req.body.title ? req.body.title : todo.title;

//     const updatedTodo = await todoModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         description: desc,
//       },
//       { new: true }
//     );

//     return res.status(201).send({ updatedTodo });
//   } catch (error) {
//     return res.status(500).send({ message: "Internal server error..." });
//   }
// };

// const deleteTodo = async (req, res) => {
//   try {
//     const todo = await todoModel.findById(req.params.id);
//     if (!todo)
//       return res
//         .status(403)
//         .send({ message: `Todo ${req.params.id} not found!` });
//     await todoModel.findByIdAndDelete(req.params.id);
//     return res.status(201).send({ message: `Todo ${req.params.id} deleted!` });
//   } catch (error) {
//     return res.status(500).send({ message: "Internal server error..." });
//   }
// };

// module.exports = {
//   createTodo,
//   getTodos,
//   getOneTodo,
//   updateTodo,
//   deleteTodo
// };





const createTodo = async(req, res) => {
  try {
    
  } catch (error) {
    console.log(error)  
  }
}


const deleteTodo = async(req, res) => {
  console.log(`Delete /${req.params.id}`)
}


const getTodos = async(req, res) => {
  console.log('Get todos')
}

module.exports = {
  getTodos,
  deleteTodo,
  createTodo
}