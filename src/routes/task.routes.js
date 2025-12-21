const express = require("express");
const {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  getTaskSummary
} = require("../controllers/task.controller.js") ;
const authMiddleware = require("../middlewares/authMiddleware.js") ;
const validate = require("../middlewares/validate.js");
const {
  createTaskValidator,
  updateTaskValidator,
  taskIdValidator,
} = require("../validators/task.validator.js");
const router = express.Router();


// All routes are protected
router.use(authMiddleware);

// CREATE
router.post("/", createTaskValidator, validate, createTask);

// READ ALL
router.get("/", getAllTasks);

// TASK Statistics
router.get("/stats/summary", getTaskSummary);

// READ ONE
router.get("/:id", taskIdValidator, validate, getSingleTask);

// UPDATE
router.put("/:id", updateTaskValidator, validate, updateTask);

// DELETE
router.delete("/:id", taskIdValidator, validate, deleteTask);

module.exports = router;
