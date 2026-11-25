import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Student from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

app.get("/api/Student", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email, phone, department, password } = req.body;

    const user = await Student.create({
      fullName,
      email,
      phone,
      password
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (error.name === "ValidationError") {
      const first = Object.values(error.errors)[0];
      return res.status(400).json({ message: first.message });
    }

    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({
      email,
      password
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

app.put("/api/User/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, department, phone } = req.body;

    const updatedUser = await Student.findByIdAndUpdate(
      id,
      { fullName, department, phone },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user id" });
    }
    if (error.name === "ValidationError") {
      const first = Object.values(error.errors)[0];
      return res.status(400).json({ message: first.message });
    }
    res.status(500).json({ message: "Error updating user" });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
}

startServer();
