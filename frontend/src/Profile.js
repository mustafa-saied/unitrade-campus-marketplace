import React, { useState } from 'react';

const API_URL = "http://localhost:5000/api";

function Profile({ student, setStudent, setPage }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: student.fullName,
    department: student.department,
    phone: student.phone
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    try {
      const response = await fetch(API_URL + "/User/" + student._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      setStudent(data.user);
      setIsEditing(false);
      setMessage("Profile updated successfully!");

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        <header className="profile-header">
          <h2>Student Profile</h2>
        </header>

        <div className="message-box">{message}</div>

        {isEditing === false && (
          <div className="profile-details">
            <div className="detail-row">
              <strong>Full Name:</strong>
              <span>{student.fullName}</span>
            </div>
            <div className="detail-row">
              <strong>University Email:</strong>
              <span>{student.email}</span>
            </div>
            <div className="detail-row">
              <strong>Department:</strong>
              <span>{student.department}</span>
            </div>
            <div className="detail-row">
              <strong>Phone:</strong>
              <span>{student.phone}</span>
            </div>

            <div className="profile-actions">
              <button type="button" className="btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
              <button type="button" className="btn-secondary" onClick={() => setPage("login")}>Logout</button>
            </div>
          </div>
        )}

        {isEditing === true && (
          <form className="profile-edit-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                placeholder="Enter your department"
                value={form.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="profile-actions">
              <button type="submit" className="btn-primary">Save Changes</button>
              <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

export default Profile;
