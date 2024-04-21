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
        const response = await axios.get(
          `http://localhost:3000/api/ViewPrescription/${patientusername}`
        );
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

  if (error || !appointments.length) {
    return <div>No Prescription found</div>;
  }

  return (
    <div style={{ backgroundColor: "#1f1f1f", color: "#fff", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
        Prescription
      </h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #444",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Date
            </th>
            <th
              style={{
                border: "1px solid #444",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Medicine Name
            </th>
            <th
              style={{
                border: "1px solid #444",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Dosage
            </th>
            <th
              style={{
                border: "1px solid #444",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Duration
            </th>
            <th
              style={{
                border: "1px solid #444",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Instruction
            </th>
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
              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {appointment.prescription_date}
              </td>
              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {appointment.medicine_name}
              </td>
              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {appointment.dosage}
              </td>
              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {appointment.duration}
              </td>
              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {appointment.instruction}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentPage;
