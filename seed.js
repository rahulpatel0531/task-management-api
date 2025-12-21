require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/user.model");
const Task = require("./src/models/task.model");

mongoose.connect(process.env.MONGO_URI);

async function seedData() {
  try {
    // clear data
    await User.deleteMany();
    await Task.deleteMany();

    // create user
    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await User.create({
      name: "Rahul",
      email: "rahul@gmail.com",
      password: hashedPassword
    });

    // create tasks
    await Task.insertMany([
      {
        title: "Learn Node.js",
        description: "Basics of Node & Express",
        status: "in-progress",
        priority: "high",
        dueDate: new Date(),
        userId: user._id
      },
      {
        title: "Learn MongoDB",
        status: "pending",
        priority: "medium",
        userId: user._id
      }
    ]);

    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedData();
