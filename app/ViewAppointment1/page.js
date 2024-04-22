"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const patientusername = localStorage.getItem("patient_username");
        console.log(patientusername);
        const response = await axios.get(
          `http://localhost:3000/api/ViewAppointment1/${patientusername}`
        );
        console.log(response);
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ backgroundColor: "#1f1f1f", color: "#fff", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
        Appointments
      </h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Doctor Name</th>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#333" : "#222",
                color: "white",
              }}
            >
              <td style={tableCellStyle}>{appointment.name}</td>
              <td style={tableCellStyle}>{appointment.appointment_date}</td>
              <td style={tableCellStyle}>{appointment.appointment_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = {
  border: "1px solid #444",
  padding: "12px",
  textAlign: "left",
  textTransform: "uppercase",
};

const tableCellStyle = {
  border: "1px solid #444",
  padding: "12px",
};

export default AppointmentPage;
