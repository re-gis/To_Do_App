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
const { protect } = require("../middlewares/auth");
const router = express.Router();

router.post("/", createTodo);
router.get("/:user", getTodos);
router.get("/:id", getOneTodo);
router.put("/:id", protect, updateTodo);
router.put("/:id/complete", protect, updateTodoComplete);
router.delete("/:id", protect, deleteTodo);
router.delete("/", protect, deleteAll);
router.delete("/complete/todos", protect, deleteComplete);

module.exports = router;
