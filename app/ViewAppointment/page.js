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
        const doctor_id = localStorage.getItem("doctor_id");
        console.log(doctor_id);
        const response = await axios.get(
          `http://localhost:3000/api/ViewAppointment/${doctor_id}`
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
    <div style={{ backgroundColor: "#f0f0f0", color: "#333", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", textAlign: "center", color: "#555" }}>
        Appointments
      </h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
                background: "#ff7e67",
                color: "#fff",
              }}
            >
              Patient Name
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
                background: "#6c5ce7",
                color: "#fff",
              }}
            >
              Date
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
                background: "#00b894",
                color: "#fff",
              }}
            >
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#fff" : "#f5f5f5",
                color: "#333",
              }}
            >
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                {appointment.Name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                {appointment.appointment_date}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                {appointment.appointment_time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentPage;
