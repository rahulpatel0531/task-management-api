require("dotenv").config();
const express = require('express');
const connectDB = require('../config/db');
const requestLogger = require("./middlewares/requestLogger");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("../swagger");



const app = express();
const PORT = process.env.PORT || 5000;

// Request logging
app.use(requestLogger);

// Parse incoming JSON data
app.use(express.json());

// Parse URL-encoded data (form data)
app.use(express.urlencoded({ extended: true }));


// Connect Database 
connectDB();

// Routes
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));



// Test route
app.get('/', (req, res) => {
  res.send('Hello,  Task Management System.');
});


// Error Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: err.message,
    statusCode:statusCode
  });
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
