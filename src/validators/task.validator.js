const { body, param } = require("express-validator");

// CREATE TASK
const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("Title must not exceed 100 characters"),
    

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status value"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority value"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("dueDate must be a valid date"),
];

// UPDATE TASK
const updateTaskValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid task ID"),

  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("description")
    .optional()
    .isString(),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),
];

// GET / DELETE TASK BY ID
const taskIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid task ID"),
];


module.exports = {
  createTaskValidator,
  updateTaskValidator,
  taskIdValidator
};