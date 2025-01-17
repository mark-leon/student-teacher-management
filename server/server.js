const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "your-secret-key";

// In-memory data store
let students = [];
let teachers = [];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Auth routes
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Mock authentication
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Student routes
app.get("/api/students", verifyToken, (req, res) => {
  res.json(students);
});

app.post("/api/students", verifyToken, (req, res) => {
  const student = {
    id: Date.now(),
    ...req.body,
  };
  students.push(student);
  res.json(student);
});

app.put("/api/students/:id", verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    res.json(students[index]);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// Teacher routes
app.get("/api/teachers", verifyToken, (req, res) => {
  res.json(teachers);
});

app.post("/api/teachers", verifyToken, (req, res) => {
  const teacher = {
    id: Date.now(),
    ...req.body,
  };
  teachers.push(teacher);
  res.json(teacher);
});

app.put("/api/teachers/:id", verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = teachers.findIndex((t) => t.id === id);

  if (index !== -1) {
    teachers[index] = { ...teachers[index], ...req.body };
    res.json(teachers[index]);
  } else {
    res.status(404).json({ message: "Teacher not found" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
