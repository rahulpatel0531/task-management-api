📋 Task Management & User Management API

    A RESTful API for managing users and tasks, built using Node.js, Express.js, MongoDB, and JWT authentication.
    Users can register, login, and perform CRUD operations on tasks, all securely and efficiently.

🚀 Project Description

    This project implements a backend API for managing tasks.
    Features include:
    User Management: registration, login with JWT authentication
    Task Management: create, read, update, delete tasks
    Task Statistics: optional feature to summarize tasks by status and priority
    Security: password hashing, JWT authentication
    Validation: express-validator for input validation
    Logging: request logging with Morgan or custom middleware
    The API ensures users only access their own tasks and provides clean, standardized JSON responses.

🛠 Tech Stack

    Node.js (v16+)
    Express.js (v4.x)
    MongoDB (with Mongoose ODM)
    JWT for authentication
    npm as package manager

📦 Prerequisites

    Node.js installed (v16+)
    npm installed (v8+)
    MongoDB (local or Atlas)
    Postman or similar API testing tool


⚙️ Installation Steps

1️⃣ Clone the repository:
    git clone https://github.com/your-username/task-management-api.git

2️⃣ Navigate into the project directory:
    cd task-management-api


3️⃣ Install dependencies:
    npm install

4️⃣ Create a .env file in the project root:
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/taskdb
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development

5️⃣ Start the development server:
    npm run dev

Server runs at:
http://localhost:5000


📌 API Endpoints
1️⃣ User Management
    Method	Endpoint	Description
    POST	/api/auth/register	Register a new user. Fields: name, email, password
    POST	/api/auth/login	Login and receive JWT. Fields: email, password

Notes:

    Registration requires unique and valid email.
    Password must be at least 6 characters.
    Response excludes password.

2️⃣ Task Management (Authenticated)
    Method	Endpoint	Description	Auth
    POST	/api/tasks	Create a new task	✅
    GET	/api/tasks	Get all tasks for logged-in user	✅
    GET	/api/tasks/:id	Get a single task by ID	✅
    PUT	/api/tasks/:id	Update a task by ID	✅
    DELETE	/api/tasks/:id	Delete a task by ID	✅

Task Fields:
    title (string, required)
    description (string, optional)
    status (enum: pending, in-progress, completed, default: pending)
    priority (enum: low, medium, high, default: medium)
    dueDate (date, optional)
    userId (auto from logged-in user)s