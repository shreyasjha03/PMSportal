"use client";
import React, { useState } from "react";
import axios from "axios";
import "./Admission.css";

function DoctorForm() {
  const [doctorId, setDoctorId] = useState("");
  const [admissions, setAdmissions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/api/Admission/${doctorId}`
      );
      setAdmissions(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error fetching admissions:", error);
    }
  };

  return (
    <div className="container">
      <form className="doctor-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Doctor ID:
            <input
              className="form-input"
              type="text"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
      {submitted && (
        <div>
          <h2 className="table-heading">Admissions</h2>
          <table className="admissions-table">
            <thead>
              <tr>
                <th>Date of Joining</th>
                <th>Patient</th>
                <th>Room No</th>
                <th>Nurse Name</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((admission, index) => (
                <tr key={index}>
                  <td>{admission.date_of_joining}</td>
                  <td>{admission.patient}</td>
                  <td>{admission.room_no}</td>
                  <td>{admission.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DoctorForm;
