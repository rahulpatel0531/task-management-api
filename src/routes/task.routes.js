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

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */
// CREATE
router.post("/", createTaskValidator, validate, createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 */
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
