const express = require("express");
const {
  createTodo,
  getTodos,
  getOneTodo,
  updateTodo,
  deleteTodo,
  deleteAll,
  updateTodoComplete,
  deleteComplete,
} = require("../controllers/todo.controller");
const router = express.Router();

router.post("/", createTodo);
router.get("/:user", getTodos);
router.get("/:id", getOneTodo);
router.put("/:id", updateTodo);
router.put("/:id/complete", updateTodoComplete);
router.delete('/:id', deleteTodo);
router.delete('/', deleteAll)
router.delete('/complete/todos', deleteComplete)

module.exports = router;
