import mongoose from "mongoose";

// Define Schema
const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
    trim: true,
  },

  department: {
    type: String,
    default: "Not specified",
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },
});


const Student = mongoose.model("Student", studentSchema);

export default Student;
