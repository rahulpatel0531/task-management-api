const asyncHandler = require("express-async-handler");
const Task = require("../models/task.model");

// @desc    Create Task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user.id,
  });

  res.status(201).json({success:true, message:"Task created successfully", data: task });
});

// @desc    Get All Tasks
// @route   GET /api/tasks
// @access  Private
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json({success:true, message:"Tasks fetched", data: tasks });
});

// @desc    Get Single Task
// @route   GET /api/tasks/:id
// @access  Private
const getSingleTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({success:true, message:"Task fetched", data: task });
});

// @desc    Update Task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({success:true, message:"Task updated successfully", data: task });
});

// @desc    Delete Task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({success:true, message: "Task deleted successfully" });
});

// @desc    Get task statistics summary
// @route   GET /api/tasks/stats/summary
// @access  Private
const getTaskSummary = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const now = new Date();

  // Total tasks
  const total = await Task.countDocuments({ userId });

  // Count by status
  const statusCounts = await Task.aggregate([
    { $match: { userId: req.user._id } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // Count by priority
  const priorityCounts = await Task.aggregate([
    { $match: { userId: req.user._id } },
    {
      $group: {
        _id: "$priority",
        count: { $sum: 1 },
      },
    },
  ]);

  // Overdue tasks (not completed & dueDate < today)
  const overdue = await Task.countDocuments({
    userId,
    dueDate: { $lt: now },
    status: { $ne: "completed" },
  });

  // Format status counts
  const statusMap = {
    pending: 0,
    "in-progress": 0,
    completed: 0,
  };

  statusCounts.forEach(item => {
    statusMap[item._id] = item.count;
  });

  // Format priority counts
  const priorityMap = {
    low: 0,
    medium: 0,
    high: 0,
  };

  priorityCounts.forEach(item => {
    priorityMap[item._id] = item.count;
  });

  res.status(200).json({
    total,
    pending: statusMap.pending,
    "in-progress": statusMap["in-progress"],
    completed: statusMap.completed,
    overdue,
    byPriority: priorityMap,
  });
});


module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  getTaskSummary
};
