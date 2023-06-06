const express = require("express");
const {
  createTodo,
  getTodos,
  getOneTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");
const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getOneTodo);
router.put("/:id", updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
