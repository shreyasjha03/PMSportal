"use client";
import React, { useState } from "react";
import axios from "axios";
import "./Appointment.css";

function DoctorForm() {
  const [patientusername, setDoctorId] = useState("");
  const [admissions, setAdmissions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/api/ViewAppointment2/${patientusername}`
      );
      console.log(response);
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
            Patient Username:
            <input
              className="form-input"
              type="text"
              value={patientusername}
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
                <th>Appointment_Date</th>
                <th>Appointment_Time</th>
                <th>Doctor Name</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((admission, index) => (
                <tr key={index}>
                  <td>{admission.appointment_date}</td>
                  <td>{admission.appointment_time}</td>
                  <td>{admission.name}</td>
                  <td>{admission.reason}</td>
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
