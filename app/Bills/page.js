"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function BillsPage() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const patient_username = localStorage.getItem("patient_username");
        console.log(patient_username);
        const response = await axios.get(
          `http://localhost:3000/api/Bills/${patient_username}`
        );
        console.log(response);
        setBills(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ backgroundColor: "#1f1f1f", color: "#fff", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Bills</h1>
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
              Bill No
            </th>
            <th
              style={{
                border: "1px solid #444",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Room Charge
            </th>
            <th
              style={{
                border: "1px solid #444",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Consultation Fee
            </th>
            <th
              style={{
                border: "1px solid #444",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Medicines Fee
            </th>
            <th
              style={{
                border: "1px solid #444",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Testing Fee
            </th>
            <th
              style={{
                border: "1px solid #444",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Total
            </th>

            <th
              style={{
                border: "1px solid #444",
                padding: "12px",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Admin ID
            </th>
          </tr>
        </thead>
        <tbody>
          {bills?.map((bill, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#333" : "#222",
                color: "white",
              }}
            >
              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {bill.Bill_no}
              </td>
              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {bill.Room_charge}
              </td>
              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {bill.Consultation_fee}
              </td>
              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {bill.Medicines_fee}
              </td>
              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {bill.Testing_fee}
              </td>
              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {bill.Total}
              </td>

              <td style={{ border: "1px solid #444", padding: "12px" }}>
                {bill.Admin_ID}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillsPage;
